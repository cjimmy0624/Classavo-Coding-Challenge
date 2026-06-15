from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/users/', include('users.urls')),

<<<<<<< HEAD
    # ALL course-related things (courses, chapters, enrollments)
    path('api/', include('courses.urls')),
=======
    path('api/', include('courses.urls')),

    path("users/", include("users.urls")),
>>>>>>> dec87e8df6d6e7bcc4bb021b8b3fe900d03b0ce3
]