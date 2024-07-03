from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterAPIView, CustomTokenObtainPairView, CustomTokenRefreshView


app_name = "auth"

urlpatterns = [
    # path('login/', obtain_auth_token),
    path("register/", RegisterAPIView.as_view(), name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="refresh_token")
]
