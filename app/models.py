from django.db import models

# Create your models here.


class React(models.Model):
    name = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    count = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.name

    class Meta:
        ordering = ['name']

# models.py


class Hotel(models.Model):
    name = models.CharField(max_length=50)
    hotel_Main_Img = models.ImageField(upload_to='images/', default="")
    rating = models.IntegerField(default=0)
