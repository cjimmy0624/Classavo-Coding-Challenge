from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/users/', include('users.urls')),

    # ALL course-related things (courses, chapters, enrollments)
    path('api/', include('courses.urls')),
]