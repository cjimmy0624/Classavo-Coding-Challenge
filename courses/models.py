from django.db import models

from users.models import User

class Course(models.Model):
    title = models.CharField(max_length=200) #Title of the course
    description = models.TextField() #Description of the course

    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses', limit_choices_to={'role': 'instructor'}) #Connects the course to a teacher (User model) using a foreign key relationship.

    creationTime = models.DateTimeField(auto_now_add=True)#Timestamp for when the course was created


class Chapter(models.Model):
    title = models.CharField(max_length=200) #Title of the chapter
    content = models.TextField() #Content within the chapter

    publicOrPrivate = models.BooleanField(default=False) #Indicates whether the chapter is public or private

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='chapters') #Connects the chapter to a course using a foreign key relationship.
    
    order = models.IntegerField(default=0) #Indicates the order of the chapter within the course.