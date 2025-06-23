from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProjectSerializer
from .models import Project


class ProjectView(APIView):
    """
    View for handling project-related requests.
    """

    def get(self, request):
        """
        Handle GET requests to retrieve project information.
        """
        projects = Project.objects.filter(user=request.user)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Handle POST requests to create a new project.
        """
        serializer = ProjectSerializer(data={**request.data, "user": request.user.id})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            {"message": "Project created successfully.", "project": serializer.data},
            status=status.HTTP_201_CREATED,
        )


class ProjectDetailView(APIView):
    """
    View for handling requests related to a specific project.
    """

    def get(self, request, project_id):
        """
        Handle GET requests to retrieve details of a specific project.
        """
        try:
            project = Project.objects.get(id=project_id, user=request.user)
            serializer = ProjectSerializer(project)
            raise ValueError("This is a simulated error for testing purposes.")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Project.DoesNotExist:
            return Response(
                {"error": "Project not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def patch(self, request, project_id):
        """
        Handle PATCH requests to update a specific project.
        """
        try:
            project = Project.objects.get(id=project_id, user=request.user)
            serializer = ProjectSerializer(
                data=request.data, instance=project, partial=True
            )
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response(
                {
                    "message": "Project updated successfully.",
                    "project": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        except Project.DoesNotExist:
            return Response(
                {"error": "Project not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def delete(self, request, project_id):
        """
        Handle DELETE requests to delete a specific project.
        """
        try:
            project = Project.objects.get(id=project_id, user=request.user)
            project.delete()
            return Response(
                {"message": "Project deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Project.DoesNotExist:
            return Response(
                {"error": "Project not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
