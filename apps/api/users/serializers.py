from rest_framework import serializers
from django.contrib.auth import get_user_model
from typing import Dict, TYPE_CHECKING

if TYPE_CHECKING:
    from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    This serializer includes all fields of the User model.
    """

    class Meta:
        model = get_user_model()
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True},
            "is_staff": {"read_only": True},
            "is_superuser": {"read_only": True},
            "last_login": {"read_only": True},
            "date_joined": {"read_only": True},
            "id": {"read_only": True},
        }

    def validate(self, attrs):
        """
        Validate the user data before creating or updating a user.
        """
        if not self.instance and not attrs.get("email"):
            raise serializers.ValidationError(
                "Email is required.", code="email_required"
            )
        if not self.instance and not attrs.get("password"):
            raise serializers.ValidationError(
                "Password is required.", code="password_required"
            )

        return super().validate(attrs)
