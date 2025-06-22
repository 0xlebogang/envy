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
        try:
            serializer = VariableSerializer(
                data={"user": request.user.id, "project": project_id, **request.data}
            )
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response(
                {
                    "message": "Variable created successfully",
                    "variable": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred. Please try again later"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class VariableDetailView(APIView):
    """
    API view for handling operations on a specific variable.
    """

    def get(self, request, project_id, pk):
        """
        Handle GET requests to retrieve a specific variable by its ID from a specific project.
        """
        try:
            variable = Variable.objects.get(
                pk=pk, project_id=project_id, user=request.user
            )
            serializer = VariableSerializer(variable)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Variable.DoesNotExist:
            return Response(
                {"error": "Variable not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred. Please try again later"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def patch(self, request, project_id, pk):
        """
        Handle PATCH requests to update a specific variable by its ID in a specific project.
        """
        try:
            variable = Variable.objects.get(
                pk=pk, project_id=project_id, user=request.user
            )
            serializer = VariableSerializer(
                data=request.data, instance=variable, partial=True
            )
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response(
                {
                    "message": "Variable updated successfully",
                    "variable": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        except Variable.DoesNotExist:
            return Response(
                {"error": "Variable not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred. Please try again later"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def delete(self, request, project_id, pk):
        """
        Handle DELETE requests to delete a specific variable by its ID from a specific project.
        """
        try:
            variable = Variable.objects.get(
                pk=pk, user=request.user, project_id=project_id
            )
            variable.delete()
            return Response(
                {"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT
            )
        except Variable.DoesNotExist:
            return Response(
                {"error": "Variable not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred. Please try again later"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
