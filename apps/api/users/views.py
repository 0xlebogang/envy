from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes

User = get_user_model()


@api_view(["POST"])
@permission_classes((AllowAny,))
def create_user(request):
    """Create a new user."""
    serializer = UserSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer.save()
    return Response(
        {"message": "User created successfully", "user": serializer.data},
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
def get_user(request):
    """Retrieve the current user's User object."""
    serializer = UserSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)


class UserDetailAPIView(APIView):
    def patch(self, request):
        """Handle PATCH requests to update an existing user."""
        serializer = UserSerializer(
            data=request.data, instance=request.user, partial=True
        )
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        """Handle DELETE requests to delete the current user."""
        request.user.delete()
        return Response(
            {"message": "User deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
