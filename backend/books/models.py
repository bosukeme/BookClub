from django.db import models
from utils.model_abstracts import Model
from django_extensions.db.models import (
    TitleSlugDescriptionModel, TimeStampedModel)


class Book(TimeStampedModel, TitleSlugDescriptionModel, Model):
    
    title = models.CharField(max_length=200, unique=True)
    author = models.CharField(max_length=50)
    year_published = models.IntegerField()
    image_url = models.CharField(max_length=500, null=True)
    summary = models.TextField(null=True)
    link = models.CharField(max_length=500, null=True)
    
    class Meta:
        verbose_name = "Book"
        verbose_name_plural = "Books"
        ordering = ["year_published"]
    
    def __str__(self) -> str:
        return self.title