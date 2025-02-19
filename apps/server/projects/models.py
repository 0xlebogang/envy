from django.db import models


class ProjectsManager(models.Manager):
    def create(self, **attrs):
        """
        Ensure name and creator fields are provided before creating a project
        """
        name = attrs.get("name")
        if not name:
            raise ValueError("Name is required")

        creator = attrs.get("creator")
        if not creator:
            raise ValueError("Creator is required")

        return super().create(**attrs)


class Projects(models.Model):
    creator = models.ForeignKey("users.User", on_delete=models.CASCADE)
    name = models.CharField(
        max_length=150,
    )
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ProjectsManager()

    def __str__(self):
        return self.name


class VaraiblesManager(models.Manager):
    def create(self, **attrs):
        """
        Ensure key, value, project & author fields are provided before creating a variable
        """
        key = attrs.get("key")
        if not key:
            raise ValueError("Key is required")

        value = attrs.pop("value")
        if not value:
            raise ValueError("Value is required")

        if not attrs.get("author"):
            raise ValueError("Author is required")

        if not attrs.get("project"):
            raise ValueError("Project is required")

        return super().create(**attrs, value=value)


class Variables(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    author = models.ForeignKey("users.User", on_delete=models.CASCADE)
    key = models.CharField(max_length=255)
    value = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = VaraiblesManager()

    def __str__(self):
        return self.key
