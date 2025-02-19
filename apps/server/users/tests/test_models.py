from django.test import TestCase
from ..models import User


class UserModelTests(TestCase):
    def setUp(self):
        self.user_data = {
            "email": "test@email.com",
            "first_name": "Test",
            "last_name": "User",
            "password": "testpass123",
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_user_creation(self):
        self.assertEqual(self.user.email, self.user_data["email"])
        self.assertEqual(self.user.first_name, self.user_data["first_name"])
        self.assertEqual(self.user.last_name, self.user_data["last_name"])
        self.assertTrue(self.user.is_active)
        self.assertFalse(self.user.is_staff)
        self.assertFalse(self.user.is_superuser)

    def test_str_representation(self):
        self.assertEqual(str(self.user), self.user.email)

    def test_email_is_required(self):
        user_data = {**self.user_data, "email": ""}
        with self.assertRaises(ValueError):
            User.objects.create_user(**user_data)

    def test_first_name_is_required(self):
        user_data = {**self.user_data, "first_name": ""}
        with self.assertRaises(ValueError):
            User.objects.create_user(**user_data)

    def test_username_is_none(self):
        self.assertIsNone(self.user.username)

    def test_create_superuser(self):
        admin_user = User.objects.create_superuser(
            email="admin@example.com", first_name="Admin", password="adminpass123"
        )
        self.assertTrue(admin_user.is_superuser)
        self.assertTrue(admin_user.is_staff)
