from django.test import TestCase
from users.models import User


class UserManagerTestCase(TestCase):
    def setUp(self):
        self.manager = User.objects
        self.user_data = {
            "email": "test.user@email.com",
            "password": "testpass123",
            "first_name": "Test",
            "last_name": "User",
        }

    def test_create_user(self):
        user = self.manager.create_user(**self.user_data)

        self.assertEqual(user.email, self.user_data["email"])
        self.assertTrue(user.check_password(self.user_data["password"]))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_user_no_first_name(self):
        with self.assertRaises(ValueError):
            user_data = self.user_data.copy()
            user_data.pop("first_name")
            self.manager.create_user(**user_data)

    def test_create_user_no_lastName(self):
        user_data_copy = self.user_data.copy()
        user_data_copy.pop("last_name")
        user = self.manager.create_user(**user_data_copy)

        self.assertEqual(user.last_name, "")
        self.assertEqual(user.email, self.user_data["email"])
        self.assertEqual(user.first_name, self.user_data["first_name"])
        self.assertTrue(user.check_password(self.user_data["password"]))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_user_no_email(self):
        with self.assertRaises(ValueError):
            self.manager.create_user(email="", password="testpass123")

    def test_create_user_no_password(self):
        with self.assertRaises(ValueError):
            self.manager.create_user(email="noPssword@email.com", password="")

    def test_create_superuser(self):
        superuser = self.manager.create_superuser(**self.user_data)

        self.assertEqual(superuser.email, self.user_data["email"])
        self.assertTrue(superuser.check_password(self.user_data["password"]))
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)
