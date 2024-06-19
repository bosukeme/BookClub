import json
import unittest
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from custom_auth.models import CustomUser


class RegisterTestCase(APITestCase):
    
    def setUp(self):
        self.client = APIClient() 
        
        self.data = {
            "username": "testuser1",
            "password": "Thisisatest",
            "email": "testuser1@test.com"
        }
        self.url_register = "/auth/register/"
    
    def create_user(self):
        response = self.client.post(self.url_register, json.dumps(self.data), content_type='application/json')
        return response
        
    def test_created_user(self):
        response = self.client.post(self.url_register, json.dumps(self.data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CustomUser.objects.count(), 1)
        self.assertEqual(CustomUser.objects.get().username, "testuser1")
        
    def test_created_user_failed_username(self):
        data = self.data
        data['username'] = "hi"
        response = self.client.post(self.url_register, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(CustomUser.objects.count(), 0)
        
    def test_created_user_failed_password(self):
        data = self.data
        data['password'] = "thisisatest"
        response = self.client.post(self.url_register, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(CustomUser.objects.count(), 0)
        
    def test_created_user_failed_email(self):
        data = self.data
        data['email'] = "testuser1#test.com"
        response = self.client.post(self.url_register, json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(CustomUser.objects.count(), 0)




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
    ]
    
    for method in test_methods:
        if hasattr(cls, method):
            setattr(cls, method, decorator(getattr(cls, method)))

    return cls


@skip_test_in_base_class
class LoginTestCase(RegisterTestCase):
    
    def setUp(self):
        super().setUp()
        
        self.url_login = "/auth/token/"
        self.data_login = {
            "username": "testuser1",
            "password": "Thisisatest"
        }
        
    def login_user(self, data_login):
        response = self.client.post(self.url_login, json.dumps(data_login), content_type='application/json')
        return response
        
    def test_login_user(self):
        self.create_user()
        data_login = self.data_login
        response = self.login_user(data_login)
        login_response = response.json()
        self.assertIn("refresh", login_response['data'])
        self.assertIn("access", login_response['data'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_wrong_username(self):
        self.create_user()
        data_login = self.data_login
        data_login['username'] = "testuser"
        
        response = self.login_user(data_login)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_login_wrong_password(self):
        self.create_user()
        data_login = self.data_login
        data_login['password'] = "thisisatest"
        
        response = self.login_user(data_login)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        
    def test_refresh_token(self):
        self.create_user()
        data_login = self.data_login
        response_login = self.login_user(data_login)
        login_json = response_login.json()
        refresh_token = login_json['data']['refresh']
        refresh_data = {"refresh": refresh_token}
        
        response = self.client.post("/auth/token/refresh/", json.dumps(refresh_data), content_type="application/json")
        refresh_response = response.json()
        self.assertIn("access", refresh_response['data'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        