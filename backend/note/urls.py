from django.urls import path
from . import views

urlpatterns = [
    path("", views.NoteListCreate.as_view(), name="note-list"),
    path("note/<str:pk>/", views.NoteGet.as_view(), name="notes-get"),
]
