from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient


class CreateUserAPIViewTests(TestCase):
    def setUp(self):
        self.user_model = get_user_model()
        self.client = APIClient()
        self.create_user_url = reverse("create-user")
        self.valid_payload = {
            "first_name": "testuser",
            "email": "test@example.com",
            "password": "testpass123",
        }
        self.invalid_payload = {
            "first_name": "",
            "email": "invalid_email@email.com",
            "password": "shortpassword",
        }

    def test_create_valid_user(self):
        response = self.client.post(
            self.create_user_url, self.valid_payload, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertGreaterEqual(self.user_model.objects.count(), 1)

        created_user = self.user_model.objects.get()
        self.assertEqual(created_user.email, self.valid_payload["email"])

    def test_create_invalid_user(self):
        response = self.client.post(
            self.create_user_url, self.invalid_payload, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        with self.assertRaises(self.user_model.DoesNotExist):
            self.user_model.objects.get(email=self.invalid_payload["email"])


class UserDetailAPIViewTests(TestCase):
    def setUp(self, **kwargs):
        self.user_model = get_user_model()
        self.client = APIClient()
        self.user_data = {
            "first_name": "testuser",
            "email": "test.user@email.com",
            "password": "testpassword123",
        }

        # Create a user
        self.user = self.user_model.objects.create_user(**self.user_data)

        # Get the token
        response = self.client.post(
            reverse("token-obtain-pair"),
            data={
                "email": self.user_data["email"],
                "password": self.user_data["password"],
            },
            format="json",
        )

        self.token = response.data["access"]

    def test_unauthorized_user(self):
        response = self.client.get(reverse("current-user"))

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_user(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.get(reverse("current-user"))
        response_data = response.data["data"]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response_data["email"], self.user_data["email"])

    def test_update_user(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        updated_user_data = {"last_name": "updateduser"}

        response = self.client.patch(
            reverse("current-user"), updated_user_data, format="json"
        )
        response_data = response.data["data"]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response_data["last_name"], updated_user_data["last_name"])
        self.assertEqual(response_data["email"], self.user_data["email"])

    def test_delete_user(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.delete(reverse("current-user"))

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        with self.assertRaises(self.user_model.DoesNotExist):
            self.user_model.objects.get(email=self.user_data["email"])
