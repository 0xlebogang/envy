from rest_framework import serializers
from .models import Projects, Variables


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


class VariableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variables
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")

    def validate(self, attrs):
        if not attrs.get("key"):
            raise serializers.ValidationError("Key is required")
        if not attrs.get("value"):
            raise serializers.ValidationError("Value is required")
        if not attrs.get("author"):
            raise serializers.ValidationError("Author is required")
        if not attrs.get("project"):
            raise serializers.ValidationError("Project is required")

        return attrs
