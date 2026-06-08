from rest_framework import serializers
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role'] #Fields need for each person
        extra_kwargs = {'password': {'write_only': True}} #Write-Only Password
    
    def create(self, validated_data):
        role = validated_data.pop('role', 'student')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
     )

        user.role = role
        user.save()

        return user