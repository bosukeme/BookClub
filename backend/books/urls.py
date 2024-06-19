from django.urls import path, include
from rest_framework import routers
from .views import BookViewSet


app_name = "books"

router = routers.DefaultRouter()

router.register(r"book", BookViewSet)

urlpatterns = [
    path("", include(router.urls))
]
