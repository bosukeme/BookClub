from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

    # def create(self, validated_data):
    #     return Note.objects.create(**validated_data)