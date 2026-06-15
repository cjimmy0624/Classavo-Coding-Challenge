from django.contrib import admin
from django.urls import path, include
from users.views import ask_ai

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/users/', include('users.urls')),
    path('api/', include('courses.urls')),
    path("users/", include("users.urls")),
    path('api/ai/', include('users.urls')),
]