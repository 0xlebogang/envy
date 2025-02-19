"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("auth/", include("users.urls")),
    path("projects/", include("projects.urls")),
    path("admin/", admin.site.urls),
]
