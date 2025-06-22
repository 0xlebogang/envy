from django.contrib.auth.models import AbstractUser, PermissionsMixin
from .managers import UserManager
from django.db import models


class User(AbstractUser, PermissionsMixin):
    """
    Custom user model that extends AbstractUser and PermissionsMixin.
    This model uses email as the unique identifier instead of username.
    """

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    username = None
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
