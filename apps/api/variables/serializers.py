from rest_framework import serializers
from .models import Variable
from typing import Dict


class VariableSerializer(serializers.ModelSerializer):
    """
    Serializer for the Variable model.
    """

    class Meta:
        model = Variable
        fields = "__all__"
        extra_kwargs = {
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True},
        }

    def validate(self, attrs: Dict) -> Dict:
        """
        Custom validation to ensure that the variable name is unique within the project.
        """
        required_fields = {"name", "value"}

        # Check if required fields are present in the attributes
        if not self.instance and not required_fields.issubset(set(attrs.keys())):
            raise serializers.ValidationError("Name and value are required fields.")

        return attrs
