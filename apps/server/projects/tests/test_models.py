from django.test import TestCase
from django.contrib.auth import get_user_model
from django.conf import settings
from cryptography.fernet import Fernet

from ..models import Projects, Variables


class TestSetup(TestCase):
    def setUp(self):
        self.test_user = get_user_model().objects.create_user(
            email="testuser@email.com",
            first_name="Test",
            password="testpassword",
        )

        self.project_data = {
            "creator": self.test_user,
            "name": "Test Project",
            "description": "This is a test project",
        }

        self.project = Projects.objects.create(**self.project_data)


class ProjectsModelTests(TestSetup):
    def setUp(self):
        super().setUp()

    def test_project_creation(self):
        self.assertEqual(self.project.creator, self.test_user)
        self.assertEqual(self.project.name, self.project_data["name"])
        self.assertEqual(self.project.description, self.project_data["description"])

    def test_str_representation(self):
        self.assertEqual(str(self.project), self.project.name)

    def test_name_is_required(self):
        project_data = {**self.project_data, "name": ""}
        with self.assertRaises(Exception):
            Projects.objects.create(**project_data)

    def test_creator_is_required(self):
        project_data = {**self.project_data, "creator": None}
        with self.assertRaises(Exception):
            Projects.objects.create(**project_data)


class VariablesModelTests(TestSetup):
    def setUp(self):
        super().setUp()
        self.variable_data = {
            "project": self.project,
            "author": self.test_user,
            "key": "test_key",
            "value": "test_value",
        }

        self.variable = Variables.objects.create(**self.variable_data)

    def test_variable_creation(self):
        self.assertEqual(self.variable.project, self.project)
        self.assertEqual(self.variable.author, self.test_user)
        self.assertEqual(
            self.variable.key, self.variable_data["key"].upper().replace(" ", "_")
        )
        self.assertIsNotNone(self.variable.value)

    def test_key_is_required(self):
        variable_data = {**self.variable_data, "key": ""}
        with self.assertRaises(Exception):
            Variables.objects.create(**variable_data)

    def test_value_is_required(self):
        variable_data = {**self.variable_data, "value": ""}
        with self.assertRaises(Exception):
            Variables.objects.create(**variable_data)

    def test_author_is_required(self):
        variable_data = {**self.variable_data, "author": None}
        with self.assertRaises(Exception):
            Variables.objects.create(**variable_data)

    def test_project_is_required(self):
        variable_data = {**self.variable_data, "project": None}
        with self.assertRaises(Exception):
            Variables.objects.create(**variable_data)

    def test_value_is_encrypted(self):
        f = Fernet(settings.ENCRYPTION_KEY)

        self.assertNotEqual(self.variable.value, self.variable_data["value"])
        self.assertEqual(
            f.decrypt(self.variable.value.encode()).decode(),
            self.variable_data["value"],
        )
