from django.db import models


class Project(models.Model):

    class Meta:
        ordering = ["name"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="projects"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.user.email}"
