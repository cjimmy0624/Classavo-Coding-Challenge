from django.contrib import admin

from .models import User #Import my User model (Teacher/Student)
admin.site.register(User) #Registers my User model to the admin page so I can add teachers and students through the admin interface