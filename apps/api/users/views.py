from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer


class UserAPIView(APIView):
    """API view for public operations on user data."""

    permission_classes = (AllowAny,)

    def post(self, request):
        """Handle POST requests to create a new user."""
        serializer = UserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(
            {"message": "User created successfully"}, status=status.HTTP_201_CREATED
        )
