from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

from ..models import Projects


class TestSetup(TestCase):
    def setUp(self):
        user_data = {
            "first_name": "testuser",
            "email": "testuser@email.com",
            "password": "testpassword",
        }

        self.user = get_user_model().objects.create_user(**user_data)
        self.client = APIClient()

        # authenticate the user
        response = self.client.post(
            reverse("token-obtain-pair"),
            {"email": user_data["email"], "password": user_data["password"]},
        )

        self.token = response.data["access"]

        self.valid_project_data = {
            "creator": self.user,
            "name": "Test Project",
        }

        self.invalid_project_data = {
            "creator": None,
            "name": None,
            "description": "Test Description",
        }


class ProjectAPIViewTests(TestSetup):
    def test_invalid_project_data(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.post(reverse("projects"), self.invalid_project_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_project(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.post(reverse("projects"), self.valid_project_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertContains(response.data["data"], self.valid_project_data)
        self.assertEqual(response.data["data"]["creator"], self.user.id)

    def test_get_projects(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.get(reverse("projects"))

        self.assertContains(response.data["data"], self.test_project)


class ProjectDetailAPIViewTests(TestSetup):
    def setUp(self):
        super().setUp()

        self.test_project = Projects.objects.create(**self.valid_project_data)

        self.update_data = {
            "name": "Updated Project",
            "description": "Updated description",
        }

    def test_get_project_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.get(
            reverse("project-detail", project_id=self.test_project.id)
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.data["data"], self.test_project)

    def test_update_project(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.patch(
            reverse("project-detail", project_id=self.test_project.id),
            self.update_data,
        )

        response_data = response.data["data"]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response_data["name"], self.update_data["name"])
        self.assertEqual(response_data["description"], self.update_data["description"])
