from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Variable
from .serializers import VariableSerializer


class VariableView(APIView):
    """
    API view for handling variable operations.
    """

    def get(self, request):
        """
        Retrieve all variables.
        """
        return Response(
            VariableSerializer(Variable.objects.all(), many=True).data,
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        """
        Create a new variable.
        """
        serializer = VariableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VariableDetailView(APIView):
    """
    API view for handling operations on a specific variable.
    """

    def get(self, request, pk):
        """
        Retrieve a specific variable by its ID.
        """
        try:
            variable = Variable.objects.get(pk=pk)
            return Response(
                VariableSerializer(variable).data, status=status.HTTP_200_OK
            )
        except Variable.DoesNotExist:
            return Response(
                {"error": "Variable not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, pk):
        """
        Update a specific variable by its ID.
        """
        try:
            variable = Variable.objects.get(pk=pk)
            serializer = VariableSerializer(variable, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Variable.DoesNotExist:
            return Response(
                {"error": "Variable not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, pk):
        """
        Delete a specific variable by its ID.
        """
        try:
            variable = Variable.objects.get(pk=pk)
            variable.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Variable.DoesNotExist:
            return Response(
                {"error": "Variable not found"}, status=status.HTTP_404_NOT_FOUND
            )
