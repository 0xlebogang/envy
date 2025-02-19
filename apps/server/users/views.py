from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from .serializers import UserSerializer, UserDetailSerializer


class CreateUserAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailAPIView(APIView):
    user_model = get_user_model()

    def get_object(self, email):
        try:
            return self.user_model.objects.get(email=email)
        except self.user_model.DoesNotExist:
            return None

    def get(self, request):
        user = self.get_object(request.user.email)
        if user is None:
            return Response(
                {"detail": "User does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = UserDetailSerializer(user)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request):
        user = self.get_object(request.user.email)
        if user is None:
            return Response(
                {"detail": "User does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = UserDetailSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user = self.get_object(request.user.email)
        if user is None:
            return Response(
                {"detail": "User does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
