from django.db import models


class Variable(models.Model):
    """
    Model representing a variable with a name and value.
    """

    class Meta:
        verbose_name = "Variable"
        verbose_name_plural = "Variables"
        ordering = ["name"]

    name = models.CharField(max_length=255, verbose_name="Variable Name")
    value = models.TextField(verbose_name="Variable Value")
    project = models.ForeignKey(
        "projects.Project",
        on_delete=models.CASCADE,
        related_name="variables",
    )
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="variables",
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")

    def __str__(self):
        return f"{self.name} - {self}"
