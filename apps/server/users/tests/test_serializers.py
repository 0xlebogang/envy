from django.test import TestCase
from rest_framework import serializers
from ..serializers import UserSerializer


class UserSerializerTests(TestCase):
    def setUp(self):
        self.user_data = {
            "email": "test.user@email.com",
            "first_name": "Test",
            "password": "testpassword123"
        }
        self.serializer = UserSerializer()

    def test_validate(self):
        validated_data = self.serializer.validate(self.user_data)
        self.assertDictEqual(validated_data, self.user_data)
    
    def test_validate_no_email(self):
        user_data = {**self.user_data, "email": ""}
        with self.assertRaises(serializers.ValidationError):
            self.serializer.validate(user_data)
    
    def test_validate_no_first_name(self):
        user_data = {**self.user_data, "first_name": ""}
        with self.assertRaises(serializers.ValidationError):
            self.serializer.validate(user_data)
    
    def test_validate_no_password(self):
        user_data = {**self.user_data, "password": ""}
        with self.assertRaises(serializers.ValidationError):
            self.serializer.validate(user_data)

    def test_create(self):
        user = self.serializer.create(self.user_data)
        self.assertEqual(user.email, self.user_data["email"])
        self.assertEqual(user.first_name, self.user_data["first_name"])
        self.assertTrue(user.check_password(self.user_data["password"]))
    