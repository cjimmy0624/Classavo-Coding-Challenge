from django.contrib import admin


from .models import Course 
from .models import Chapter 
admin.site.register(Course) #Registers the Course model with the Django admin site, allowing administrators to manage courses through the admin interface.
admin.site.register(Chapter)  #Registers the Chapter model with the Django admin site, allowing administrators to manage chapters through the admin interface.