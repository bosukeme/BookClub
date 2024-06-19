from rest_framework_json_api import serializers 
from rest_framework.fields import CharField
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    
    genre = CharField(source="description")
    
    class Meta:
        model = Book
        fields = (
            'title',
            'author',
            'year_published',
            'genre',
            'image_url',
            'summary',
            "slug",
            "link"
        )