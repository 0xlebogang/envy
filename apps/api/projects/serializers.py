from rest_framework import serializers
from .models import Project
from typing import Dict


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        extra_kwargs = {
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True},
        }

    def validate(self, attrs: Dict) -> Dict:
        """
        Validate the project attributes. Checks if the name is provided.
        """
        if not self.instance and not attrs.get("name"):
            raise serializers.ValidationError("Project name is required.")
        return attrs

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
