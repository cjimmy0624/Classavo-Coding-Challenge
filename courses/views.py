from rest_framework import generics, permissions
from .models import Course,Chapter, Enrollment
from .serializers import CourseSerializer, ChapterSerializer, EnrollmentSerializer

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated] #Course viewed by authorized users only

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
        return Chapter.objects.filter(course_id=course_id,publicOrPrivate=True) #List of chapters in a course
    
class ChapterCreateView(generics.CreateAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated] #Chapter created by authorized users only

    def perform_create(self, serializer):
        course_id = self.kwargs['course_id']
        serializer.save(course_id=course_id) #Course is set to the course the chapter belongs to

class EnrollmentCreateView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated] #Enrollment created by authorized users only

    def perform_create(self, serializer):
        course_id = self.kwargs['course_id']
        serializer.save(student=self.request.user, course_id=course_id) #Student is set to the user creating the enrollment and course is set to the course the enrollment belongs to