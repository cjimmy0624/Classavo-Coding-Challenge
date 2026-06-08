from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserRegistrationView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'), #User registration URL
    path('login/', TokenObtainPairView.as_view(), name='token_access'), #User login URL
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), #Refreshing JWT tokens URL
]