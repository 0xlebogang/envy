from django.urls import path
from .views import UserDetailAPIView, create_user, get_user

urlpatterns = [
    path("create/", create_user, name="user-create"),
    path("me/", get_user, name="get-user"),
    path("detail/", UserDetailAPIView.as_view(), name="user-detail"),
]
