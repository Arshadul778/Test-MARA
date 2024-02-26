from django.db import models

# Create your models here.


class React(models.Model):
    employee = models.CharField(max_length=255)
    department = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.employee

    class Meta:
        ordering = ['employee']
