from rest_framework import serializers
from rest_framework.fields import CharField, EmailField
# from django.contrib.auth.models import User
from rest_framework import status
from .models import CustomUser
from rest_framework.exceptions import APIException

# class UsernameLengthError(APIException):
#     status_code = status.HTTP_400_BAD_REQUEST
#     default_detail = 'Username should be between 4 and 10 characters long'
#     default_code = 'invalid'

class AuthError(serializers.ValidationError):
    def __init__(self, detail=None, code=None):
        if detail is None:
            detail = "Invalid Input"
        super().__init__(detail, code)


class RegisterSerializer(serializers.ModelSerializer):
    
    username = CharField(required=True)
    email = EmailField(required=True)
    password = CharField(write_only=True, required=True)
    
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password')
    

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def validate(self, data):
        
        username: str = data['username']
        password: str = data['password']
        
        if not (4 <= len(username) <= 10):
            raise serializers.ValidationError("Username should be between 4 and 10 characters long")
        
        if not (6<= len(password) <= 12) or not any(map(str.isupper, password)):
            raise serializers.ValidationError("Password should be between 6 and 12 characters long and must have 1 capital letter")
        
        return data
