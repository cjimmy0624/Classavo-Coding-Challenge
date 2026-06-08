from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        print("🔥 CUSTOM SERIALIZER RUNNING")
        data = super().validate(attrs)

        user = self.user
        data['role'] = user.role
        data['username'] = user.username

        return data