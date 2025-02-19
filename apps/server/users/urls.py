from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import CreateUserAPIView, UserDetailAPIView

urlpatterns = [
    path("user/me/", UserDetailAPIView.as_view(), name="current-user"),
    path("user/token/", TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path('user/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path("user/create/", CreateUserAPIView.as_view(), name="create-user"),
]
