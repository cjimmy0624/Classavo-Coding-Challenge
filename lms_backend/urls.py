from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')), #User Section URLs
    path('api/courses/', include('courses.urls')), #Course Section URLs
    
]
