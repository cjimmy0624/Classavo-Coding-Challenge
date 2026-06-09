from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from .models import Course, Chapter, Enrollment
from .serializers import CourseSerializer, ChapterSerializer, EnrollmentSerializer


class CourseListCreateView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # instructors only see their own courses
        if hasattr(user, "role") and user.role == "instructor":
            return Course.objects.filter(instructor=user)

        # students see all courses
        return Course.objects.all()

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)


class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        course = self.get_object()

        chapters = course.chapter_set.all().order_by('order')

        return Response({
            "course": CourseSerializer(course).data,
            "chapters": ChapterSerializer(chapters, many=True).data
        })


class ChapterListView(generics.ListAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        course_id = self.kwargs['course_id']

        return Chapter.objects.filter(
            course_id=course_id,
            publicOrPrivate=True
        ).order_by('order')


class ChapterCreateView(generics.CreateAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        course_id = self.kwargs['course_id']
        course = Course.objects.get(id=course_id)

        if course.instructor != self.request.user:
            raise PermissionDenied("Not allowed")

        serializer.save(course=course)


class ChapterDetailView(generics.RetrieveUpdateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]


class ChapterUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        chapter = self.get_object()

        if chapter.course.instructor != self.request.user:
            raise PermissionDenied("Not allowed")

        serializer.save()


class ChapterDeleteView(generics.DestroyAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        if instance.course.instructor != self.request.user:
            raise PermissionDenied("Not allowed")
        instance.delete()

class EnrollmentCreateView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        course_id = self.kwargs['course_id']

        course = Course.objects.get(id=course_id)

        serializer.save(
            student=self.request.user,
            course=course
        )