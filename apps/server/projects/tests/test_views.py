from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework.utils.serializer_helpers import ReturnList

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
            "creator": self.user.id,
            "name": "Test Project",
        }

        self.invalid_project_data = {
            "name": "",
            "description": "Test Description",
        }


class ProjectAPIViewTests(TestSetup):
    def setUp(self):
        return super().setUp()

    def test_invalid_project_data(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.post(reverse("projects"), self.invalid_project_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_project(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.post(reverse("projects"), self.valid_project_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response_data = response.data["data"]
        self.assertEqual(response_data["name"], self.valid_project_data["name"])
        self.assertEqual(response_data["creator"], self.valid_project_data["creator"])


class ProjectDetailAPIViewTests(TestSetup):
    def setUp(self):
        super().setUp()

        test_project_data = {**self.valid_project_data, "creator": self.user}

        self.test_project = Projects.objects.create(**test_project_data)

        self.update_data = {
            "name": "Updated Project",
            "description": "Updated description",
        }

    def test_get_projects(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.get(reverse("projects"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(type(response.data["data"]), ReturnList)
        self.assertTrue(len(response.data["data"]) > 0)
        self.assertEqual(response.data["data"][0]["name"], self.test_project.name)

    def test_get_project_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.get(
            reverse("project-detail", kwargs={"project_id": self.test_project.id})
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.data["data"]
        self.assertEqual(response_data["id"], self.test_project.id)
        self.assertEqual(response_data["name"], self.test_project.name)
        self.assertEqual(response_data["creator"], self.test_project.creator.id)

    def test_update_project(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.patch(
            reverse("project-detail", kwargs={"project_id": self.test_project.id}),
            self.update_data,
        )

        response_data = response.data["data"]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response_data["name"], self.update_data["name"])
        self.assertEqual(response_data["description"], self.update_data["description"])

    def test_delete_project(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.delete(
            reverse("project-detail", kwargs={"project_id": self.test_project.id})
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Projects.objects.filter(pk=self.test_project.id).exists())
