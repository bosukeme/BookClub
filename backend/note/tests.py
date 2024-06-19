from rest_framework import status
import unittest
import json
from .models import Note
from custom_auth.tests import LoginTestCase
from custom_auth.models import CustomUser


def skip_test_in_base_class(cls):
    def decorator(func):
        def wrapper(self, *args, **kwargs):
            raise unittest.SkipTest(f"Skipping test in {cls.__name__}")
        return wrapper
    
    test_methods = [
        "test_created_user",
        "test_created_user_failed_username",
        "test_created_user_failed_password",
        "test_created_user_failed_email",
        "test_login_user",
        "test_login_wrong_username",
        "test_login_wrong_password",
        "test_refresh_token"
    ]
    
    for method in test_methods:
        if hasattr(cls, method):
            setattr(cls, method, decorator(getattr(cls, method)))

    return cls


@skip_test_in_base_class
class NoteTestCase(LoginTestCase):
    def setUp(self):
        super().setUp()
        
        self.create_user()
        response_login = self.login_user(self.data_login)
        login_json = response_login.json()
        self.access_token = login_json['data']['access']
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")
        
        Note.objects.create(
            title = "Notes title",
            content = "Notes content",
            author = CustomUser.objects.first()
        )
        self.note = Note.objects.get(title="Notes title")
    
    def test_create_note(self):
        note_data = {
                "title": "New note",
                "content": "New note created from test"
                }
        response = self.client.post("/notes/", json.dumps(note_data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Note.objects.count(), 2)
        
    def test_get_notes(self):
        response = self.client.get("/notes/")
        notes_json = response.json()
        notes = notes_json['data']
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(notes), 1)
        
    def test_get_note(self):
        id = self.note.id
        response = self.client.get(f"/notes/note/{id}/")
        note_json = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(note_json['data']['id'], str(id))
        self.assertEqual(note_json['data']['attributes']['title'], self.note.title)

    def test_update_note(self):
        id = self.note.id
        note_data = {
                "title": "Notes title updated",
                "content": "Notes content updated"
                }
        response = self.client.patch(f"/notes/note/{id}/", json.dumps(note_data), content_type="application/json")
        note_json = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(note_json['data']['attributes']['title'], note_data['title'])
    
    def test_delete_note(self):
        id = self.note.id
        response = self.client.delete(f"/notes/note/{id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Note.objects.count(), 0)
