from django.db import models

from django.contrib.auth.models import AbstractUser #Import AbstractUser to create a custom User model (Teacher/Student)

class User(AbstractUser):

    roleChoices = (('instructor', 'Instructor'), ('student', 'Student'),) #choices for users
    
    role = models.CharField(max_length=20, choices=roleChoices) #added to dataset to differentiate between teachers and students