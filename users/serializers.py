from rest_framework import serializers
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role'] #Fields need for each person
        extra_kwargs = {'password': {'write_only': True}} #Write-Only Password
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) #Creates a new user using the validated data
        return user