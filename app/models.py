from django.db import models
from django.contrib.auth.models import User

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


class Models(models.Model):
    name = models.CharField(max_length=100)
    img = models.ImageField(upload_to='images/', default="")
    discriptions = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    model_name = models.ForeignKey(Models, on_delete=models.PROTECT)
    rating = models.IntegerField(default=0)
