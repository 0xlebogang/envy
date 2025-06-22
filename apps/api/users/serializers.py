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

    def create(self, validated_data: Dict) -> "User":
        """
        Create a new user with the provided validated data.
        """
        if "email" not in validated_data:
            raise serializers.ValidationError(
                "Email is required.", code="email_required"
            )
        if "password" not in validated_data:
            raise serializers.ValidationError(
                "Password is required.", code="password_required"
            )
        if len(validated_data["password"]) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long.",
                code="password_too_short",
            )

        user = self.Meta.model(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance: "User", validated_data: Dict) -> "User":
        """
        Update an existing user with the provided validated data.
        """
        for attr, value in validated_data.items():
            if attr == "password":
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
