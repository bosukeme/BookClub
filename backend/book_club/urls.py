from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

router = routers.DefaultRouter()

urlpatterns = router.urls

urlpatterns += [
    path("admin/", admin.site.urls),
    path('auth/', include("custom_auth.urls")),
    path('books/', include("books.urls")),
    path('notes/', include("note.urls")),
    path("api-auth/", include("rest_framework.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/schema/docs/", SpectacularSwaggerView.as_view(url_name="schema"))
]
