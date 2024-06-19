from django.db import models
from custom_auth.models import CustomUser
from utils.model_abstracts import Model


class Note(Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notes')
    
    
    def __str__(self) -> str:
        return self.title
