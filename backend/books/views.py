from json import JSONDecodeError
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import ListModelMixin, CreateModelMixin, UpdateModelMixin, RetrieveModelMixin, DestroyModelMixin

from .models import Book
from .serializer import BookSerializer


# CreateModelMixin,UpdateModelMixin, DestroyModelMixin,

class BookViewSet(ListModelMixin, RetrieveModelMixin, viewsets.GenericViewSet):
    
    # permission_classes = (IsAuthenticated,)
    queryset = Book.objects.all()
    serializer_class = BookSerializer