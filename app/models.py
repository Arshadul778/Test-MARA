from django.db import models

# Create your models here.


class React(models.Model):
    employee = models.CharField(max_length=255)
    department = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.employee

    class Meta:
        ordering = ['employee']

# models.py


class Hotel(models.Model):
    name = models.CharField(max_length=50)
    hotel_Main_Img = models.ImageField(upload_to='images/', default="")
    rating = models.IntegerField(default=0)
