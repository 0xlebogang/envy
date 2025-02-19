from rest_framework import serializers
from .models import Projects


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

    def validate(self, attrs):
        if not attrs.get("name"):
            raise serializers.ValidationError("Name is required")
        if not attrs.get("creator"):
            raise serializers.ValidationError("Creator is required")

        return attrs


class ProjectDetailSerializer(serializers.ModelSerializer):
    class Meta(ProjectSerializer.Meta):
        read_only_fields = ("creator", "created_at", "updated_at")
