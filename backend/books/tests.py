from rest_framework import status
import json
import unittest
from .models import Book

from custom_auth.tests import LoginTestCase


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
class BookTestCase(LoginTestCase):
    def setUp(self):
        super().setUp()
        
        self.create_user()
        data_login = self.data_login
        response_login = self.login_user(data_login)
        login_response = response_login.json()
        self.access_token = login_response['data']['access']
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")

        Book.objects.create(
            title = "The Little Prince",
            author = "Antoine de Saint-Exup\u00e9ry",
            year_published = 2024,
            description = "Fantasy, children's fiction",
            image_url = "//upload.wikimedia.org/wikipedia/en/thumb/0/05/Littleprince.JPG/220px-Littleprince.JPG",
            summary = "short summary",
            link = "https://en.wikipedia.org/wiki/The_Little_Prince"
        )
        
        self.book = Book.objects.get(title="The Little Prince")
        
    def test_get_books(self):
        response = self.client.get("/books/book/")
        books_json = response.json()
        books = books_json['data']
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(books), 1)
        
    def test_get_book(self):
        id = self.book.id
        response = self.client.get(f"/books/book/{id}/")
        book_json = response.json()
        self.assertEqual(book_json['data']['id'], str(id))
        self.assertEqual(book_json['data']['attributes']['title'], self.book.title)
