from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Variable
from .serializers import VariableSerializer


class VariableView(APIView):
    """
    API view for handling variable operations.
    """

    def get(self, request, project_id):
        """
        Handle GET requests to retrieve all variables for the authenticated user in the specific project.
        """
        try:
            variables = Variable.objects.filter(
                project_id=project_id, user=request.user
            )
            serializer = VariableSerializer(variables, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Variable.DoesNotExist:
            return Response(
                {"error": "Variables not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occured. Please try again later"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request, project_id):
        """
        Create a new variable for the authenticated user in the specific project.
        """
        serializer = VariableSerializer(
            data={"user": request.user.id, "project": project_id, **request.data}
        )
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(
            {"message": "Variable created successfully", "variable": serializer.data},
            status=status.HTTP_201_CREATED,
        )


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
