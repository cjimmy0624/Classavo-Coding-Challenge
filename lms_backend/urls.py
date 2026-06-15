from django.contrib import admin
from django.urls import path, include
from users.views import ask_ai

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/users/', include('users.urls')),
<<<<<<< HEAD
    path('api/courses/', include('courses.urls')),
=======
    path('api/', include('courses.urls')),
    path("users/", include("users.urls")),
    path ('api/ai/ask', ask_ai)
>>>>>>> cde3f77ee04bc05bc3804a080d3b351875954367
]