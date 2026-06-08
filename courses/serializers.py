from rest_framework import serializers
from .models import Course, Chapter, Enrollment

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'instructor','creationTime'] #Fields needed for each course
        read_only_fields = ['instructor', 'creationTime'] #Instructor and creationTime are read-only

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'title', 'content', 'publicOrPrivate','order','course'] #Fields needed for each chapter
        read_only_fields = ['course'] #Course and created_at are read-only

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course','enrollmentTime'] #Fields needed for each enrollment
        read_only_fields = ['student','course','enrollmentTime'] #Student, course and enrollmentTime are read-only