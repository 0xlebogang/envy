from django.urls import path
from .views import VariableView, VariableDetailView

urlpatterns = [
    path("", VariableView.as_view(), name="variable-view"),
    path("<int:pk>/", VariableDetailView.as_view(), name="variable-detail-view"),
]
