from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Course,Chapter, Enrollment
from .serializers import CourseSerializer, ChapterSerializer, EnrollmentSerializer

class CourseListView(generics.ListAPIView):
        serializer_class = CourseSerializer
        permission_classes = [permissions.IsAuthenticated]

        def get_queryset(self):
            user = self.request.user

            if hasattr(user, "role") and user.role == "instructor":
                return Course.objects.filter(instructor=user)

            return Course.objects.all()

class CourseCreateView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated] #Course created by authorized users only

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user) #Instructor is set to the user creating the course


class ChapterListView(generics.ListAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated] #Chapter viewed by authorized users only

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return Chapter.objects.filter(course_id=course_id, is_public=True)  
      
class ChapterCreateView(generics.CreateAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated] #Chapter created by authorized users only

    def perform_create(self, serializer):
        course_id = self.kwargs['course_id']
        course = Course.objects.get(id=course_id)

        if course.instructor != self.request.user:
            raise PermissionDenied("Not allowed")

        serializer.save(course=course)

class ChapterDetailView(generics.RetrieveAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated] #Chapter details viewed by authorized users only

class EnrollmentCreateView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated] #Enrollment created by authorized users only

    def perform_create(self, serializer):
        course_id = self.kwargs['course_id']
        serializer.save(student=self.request.user, course_id=course_id) #Student is set to the user creating the enrollment and course is set to the course the enrollment belongs to

class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated] #Course details viewed by authorized users only

    def retrieve(self, request, *args, **kwargs):
        course = self.get_object()
        chapters = course.chapters.all().order_by('order') #Get all chapters in the course ordered by their order field

        return Response({
            "course": CourseSerializer(course).data,
            "chapters": ChapterSerializer(chapters, many=True).data
        })
    