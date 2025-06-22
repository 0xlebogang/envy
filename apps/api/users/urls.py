from django.urls import path
from .views import UserAPIView

urlpatterns = [
    path("create/", UserAPIView.as_view(), name="user-create"),
]
