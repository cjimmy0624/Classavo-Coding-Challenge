from django.db import models

from users.models import User

class Course(models.Model):
    title = models.CharField(max_length=200) #Title of the course
    description = models.TextField() #Description of the course

    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses', limit_choices_to={'role': 'instructor'}) #Connects the course to a teacher (User model) using a foreign key relationship.

    creationTime = models.DateTimeField(auto_now_add=True)#Timestamp for when the course was created


