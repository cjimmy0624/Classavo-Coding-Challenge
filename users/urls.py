from django.urls import path
from .views import UserRegistrationView, CustomTokenObtainPairView

urlpatterns = [
    path('register/', UserRegistrationView.as_view()),
    path('login/', CustomTokenObtainPairView.as_view()),
]