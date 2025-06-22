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
        {"message": "User created successfully"}, status=status.HTTP_201_CREATED
    )


@api_view(["GET"])
def get_user(request):
    """Retrieve the current user's User object."""
    serializer = UserSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)


class UserDetailAPIView(APIView):
    def patch(self, request, pk):
        """Handle PATCH requests to update an existing user."""
        try:
            user = self.get_object(pk)
        except User.DoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(
            {"message": "User updated successfully"}, status=status.HTTP_200_OK
        )
