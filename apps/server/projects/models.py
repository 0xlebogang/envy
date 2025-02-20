from django.db import models
from django.conf import settings
from cryptography.fernet import Fernet


class ProjectsManager(models.Manager):
    def create(self, **attrs):
        """
        Ensure name and creatorself.__fields are provided before creating a project
        """
        name = attrs.get("name")
        if not name:
            raise ValueError("Name is required")

        creator = attrs.get("creator")
        if not creator:
            raise ValueError("Creator is required")

        self.__f = Fernet(settings.ENCRYPTION_KEY)

        return super().create(**attrs)


class Projects(models.Model):
    creator = models.ForeignKey("users.User", on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ProjectsManager()

    def __str__(self):
        return self.name


class VaraiblesManager(models.Manager):
    @staticmethod
    def normalize_key(key):
        """
        Normalizes the key by:
        - Removing any leading or trailing whitespaces
        - Converting the key to uppercase
        - Replacing any spaces with underscores

        :param key: The key to be normalized
        """
        # Implement regex to look for any special characters and reject the key
        return key.strip().upper().replace(" ", "_")

    def create(self, key, value, **attrs):
        """
        Ensure key, value, project & authorself.__fields are provided and
        encrypts the value before creating a variable
        """
        if not key or not value:
            raise ValueError("Key and value are required fields")

        if not attrs.get("project") or not attrs.get("author"):
            raise ValueError("Project and author are required fields")

        key = self.normalize_key(key)
        variable = self.model(key=key, **attrs)
        variable.set_value(value)
        variable.save()
        return variable


class Variables(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    author = models.ForeignKey("users.User", on_delete=models.CASCADE)
    key = models.CharField(max_length=255)
    value = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = VaraiblesManager()

    # Private fernet object for encrypting and decrypting values
    __f = Fernet(settings.ENCRYPTION_KEY)

    def __str__(self):
        return self.key

    def set_value(self, raw_value):
        """
        Encrypts and sets the value of the environment variable
        """
        self.value = self.__f.encrypt(raw_value.encode()).decode()

    def check_value(self, raw_value):
        """
        Decrypts and checks if the raw value matches the decrypted value
        """
        self.__f = Fernet(settings.ENCRYPTION_KEY)
        return self.__f.decrypt(self.value.encode()).decode() == raw_value
