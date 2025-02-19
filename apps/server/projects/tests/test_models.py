from django.test import TestCase
from django.contrib.auth import get_user_model
from ..models import Projects


class ProjectsModelTests(TestCase):
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
