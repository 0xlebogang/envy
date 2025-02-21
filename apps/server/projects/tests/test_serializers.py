from django.test import TestCase
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework import serializers
from cryptography.fernet import Fernet
from ..serializers import (
    ProjectSerializer,
    ProjectDetailSerializer,
    VariableSerializer,
    VariableDetailSerializer,
)
from ..models import Projects, Variables


class TestSetUp(TestCase):
    def setUp(self):
        self.serializer = ProjectSerializer

        # Create a dummy user
        self.user = get_user_model().objects.create_user(
            first_name="testuser",
            email="testuser@email.com",
            password="testpassword",
        )


class ProjectSerialzerTests(TestSetUp):
    def setUp(self):
        super().setUp()

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

    def test_create_project(self):
        serializer = self.serializer(data=self.valid_project_data)
        serializer.is_valid()
        project = serializer.save()
        self.assertEqual(project.name, self.valid_project_data["name"])
        self.assertEqual(project.creator, self.user)


class ProjectDetailSerializerTests(TestSetUp):
    def setUp(self):
        super().setUp()

        self.update_data = {
            "name": "Updated Project",
            "description": "Updated Description",
        }

        self.test_project = Projects.objects.create(
            name="Test Project",
            description="Test Description",
            creator=self.user,
        )

    def test_update_project(self):
        serializer = ProjectDetailSerializer(
            instance=self.test_project, data=self.update_data, partial=True
        )

        self.assertTrue(serializer.is_valid())

        with self.subTest("Test project name update & description are updated"):
            serializer.save()
            self.test_project.refresh_from_db()
            self.assertEqual(self.test_project.name, self.update_data["name"])
            self.assertEqual(
                self.test_project.description, self.update_data["description"]
            )


class VariableSerializerTests(TestSetUp):
    def setUp(self):
        super().setUp()

        self.test_project = Projects.objects.create(
            name="Test Project", creator=self.user
        )

        self.valid_variable_data = {
            "key": "Test Key",
            "value": "Test Value",
            "author": self.user.id,
            "project": self.test_project.id,
        }

        self.invalid_variable_data = {"key": "", "value": "Invalid value"}

        self.__f = Fernet(settings.ENCRYPTION_KEY)

    def test_invalid_variable_(self):
        serializer = VariableSerializer(data=self.invalid_variable_data)
        self.assertFalse(serializer.is_valid())
        with self.assertRaises(serializers.ValidationError):
            serializer.is_valid(raise_exception=True)

    def test_variable_validator(self):
        serializer = VariableSerializer(data=self.valid_variable_data)
        self.assertTrue(serializer.is_valid())

    def test_create_variable(self):
        serializer = VariableSerializer(data=self.valid_variable_data)
        serializer.is_valid()
        variable = serializer.save()
        normalized_key = (
            self.valid_variable_data["key"].strip().upper().replace(" ", "_")
        )
        self.assertEqual(variable.key, normalized_key)
        self.assertEqual(
            self.__f.decrypt(variable.value.encode()).decode(),
            self.valid_variable_data["value"],
        )
        self.assertEqual(variable.author, self.user)
        self.assertEqual(variable.project, self.test_project)
