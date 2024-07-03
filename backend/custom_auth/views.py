from json import JSONDecodeError
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


from .serializer import RegisterSerializer


@extend_schema(tags=['auth'])
class RegisterAPIView(views.APIView):
    
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            data = JSONParser().parse(request)
            serializer = RegisterSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except JSONDecodeError as e:
            return JsonResponse({
                "result": "Error",
                "message": f"Json Decoding error: {e}",
            }, status.HTTP_400_BAD_REQUEST)


@extend_schema(tags=['auth'])
class CustomTokenObtainPairView(TokenObtainPairView):
    pass

@extend_schema(tags=['auth'])
class CustomTokenRefreshView(TokenRefreshView):
    pass
