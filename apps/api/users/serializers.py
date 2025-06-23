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
        required_fields = {"email", "password"}

        if not self.instance and not required_fields.issubset(attrs):
            raise serializers.ValidationError(
                f"Missing required fields: {required_fields - attrs.keys()}"
            )

        return super().validate(attrs)

    def create(self, validated_data: Dict) -> "User":
        """
        Create a new user instance.
        """
        password = validated_data.pop("password", None)

        user = self.Meta.model(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data: Dict) -> "User":
        """
        Update an existing user instance.
        """
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance
