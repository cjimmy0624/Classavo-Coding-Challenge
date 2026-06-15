from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
<<<<<<< HEAD
from .views import UserRegistrationView, CustomTokenObtainPairView
=======
from .views import UserRegistrationView, CustomTokenObtainPairView, ask_ai
>>>>>>> dec87e8df6d6e7bcc4bb021b8b3fe900d03b0ce3

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
<<<<<<< HEAD
=======
    path('ask/',ask_ai),
>>>>>>> dec87e8df6d6e7bcc4bb021b8b3fe900d03b0ce3
]