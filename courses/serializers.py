from rest_framework import serializers
from .models import Course, Chapter, Enrollment

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'instructor', 'creationTime']
        read_only_fields = ['instructor', 'creationTime']

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id','title','content','publicOrPrivate','order','course']
        read_only_fields = ['course']  # course will be assigned in request or view

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course', 'enrollmentTime']
        read_only_fields = ['student', 'course', 'enrollmentTime']