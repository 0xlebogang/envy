from django.urls import path
from .views import (
    ProjectsAPIView,
    ProjectDetailAPIView,
    VariablesAPIView,
    VariableDetailAPIView,
)

urlpatterns = [
    path("", ProjectsAPIView.as_view(), name="projects"),
    path("<int:project_id>/", ProjectDetailAPIView.as_view(), name="project-detail"),
    path(
        "<int:project_id>/variables/",
        VariablesAPIView.as_view(),
        name="variables",
    ),
    path(
        "<int:project_id>/variables/<int:variable_id>/",
        VariableDetailAPIView.as_view(),
        name="variable-detail",
    ),
]
