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

        project = serializer.save(user=request.user)
        return Response(
            {"message": "Project created successfully.", "project": project},
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
        # Placeholder for actual project detail retrieval logic
        return Response(
            {"message": f"Details for project {project_id} retrieved successfully."},
            status=status.HTTP_200_OK,
        )

    def patch(self, request, project_id):
        """
        Handle PATCH requests to update a specific project.
        """
        # Placeholder for actual project update logic
        return Response(
            {"message": f"Project {project_id} updated successfully."},
            status=status.HTTP_200_OK,
        )
