from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404

from .models import Course, Chapter, Enrollment
from .serializers import CourseSerializer, ChapterSerializer, EnrollmentSerializer

class CourseListCreateView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if hasattr(user, "role") and user.role == "instructor":
            return Course.objects.filter(instructor=user)

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
        course = get_object_or_404(Course, id=self.kwargs['course_id'])

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

    def create(self, request, *args, **kwargs):
        course = get_object_or_404(Course, id=self.kwargs['course_id'])

        enrollment, created = Enrollment.objects.get_or_create(
            student=request.user,
            course=course
        )

        if created:
            return Response(
                {"message": "Joined course successfully"},
                status=201
            )
        else:
            return Response(
                {"message": "You are already enrolled in this course"},
                status=200
            )

class StudentEnrolledCoursesView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Course.objects.filter(
            enrollments__student=self.request.user
        ).distinct()