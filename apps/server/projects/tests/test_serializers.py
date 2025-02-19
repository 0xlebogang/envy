from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework import serializers
from ..serializers import ProjectSerializer


class ProjectSerialzerTests(TestCase):
    def setUp(self):
        self.serializer = ProjectSerializer

        # Create a dummy user
        self.user = get_user_model().objects.create_user(
            first_name="testuser",
            email="testuser@email.com",
            password="testpassword",
        )

        self.valid_project_data = {
            "creator": self.user.id,
            "name": "Test Project",
        }

        self.invalid_project_data = {
            "creator": None,
            "name": None,
            "description": "Test Description",
        }

    def test_project_validator(self):
        serializer = self.serializer(data=self.valid_project_data)
        self.assertTrue(serializer.is_valid())
        self.assertDictEqual(serializer.data, self.valid_project_data)

    def test_validation_error(self):
        serializer = self.serializer(data=self.invalid_project_data)
        self.assertFalse(serializer.is_valid())
        with self.assertRaises(serializers.ValidationError):
            serializer.is_valid(raise_exception=True)
