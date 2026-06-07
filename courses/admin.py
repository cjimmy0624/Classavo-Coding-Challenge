from django.contrib import admin
from .models import Chapter

from .models import Course #Import my User model (Teacher/Student)
admin.site.register(Course) #Registers my User model to the admin page so I can add teachers and students through the admin interface
admin.site.register(Chapter) #Registers my User model to the admin page 