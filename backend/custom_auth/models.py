from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from utils.model_abstracts import Model


class CustomUserManager(BaseUserManager):
    def crete_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("Username must be set")
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    
class CustomUser(AbstractBaseUser, PermissionsMixin, Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = "username"
    # REQUIRED_FIELDS = ['username']
    
    def __str__(self) -> str:
        return self.username
    
    