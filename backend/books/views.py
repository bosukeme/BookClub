from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from drf_spectacular.utils import extend_schema

from .models import Book
from .serializer import BookSerializer


@extend_schema(tags=['books'])
class BookViewSet(ListModelMixin, RetrieveModelMixin, viewsets.GenericViewSet):
    
    # permission_classes = (IsAuthenticated,)
    queryset = Book.objects.all()
    serializer_class = BookSerializer