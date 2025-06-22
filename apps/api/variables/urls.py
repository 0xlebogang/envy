from django.urls import path
from .views import VariableView, VariableDetailView

urlpatterns = [
    path("<int:project_id>/", VariableView.as_view(), name="variable-view"),
    path(
        "<int:project_id>/", VariableDetailView.as_view(), name="variable-detail-view"
    ),
]
