from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"
        read_only_fields = ("id", "date_joined", "is_active")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        """
        Ensure email, password & first name are provided.
        """
        email = attrs.get("email")
        first_name = attrs.get("first_name")
        password = attrs.get("password")

        if not email or not password or not first_name:
            raise serializers.ValidationError(
                "Email, Password & First Name are required"
            )

        return attrs

    def create(self, validated_data):
        """
        Create new user
        """
        user = self.Meta.model.objects.create_user(**validated_data)
        return user


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"
        read_only_fields = ("id", "date_joined", "is_active", "email")
        extra_kwargs = {"password": {"write_only": True}}
