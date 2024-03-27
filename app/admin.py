from django.contrib import admin
from . import models

# Register your models here.


@admin.register(models.React)
class ReactAdmin(admin.ModelAdmin):
    list_display = ['name', 'department', 'count']


@admin.register(models.Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'rating']


@admin.register(models.Models)
class ModelsAdmin(admin.ModelAdmin):
    list_display = ['name', 'img', 'discriptions']


@admin.register(models.Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ['user', 'model_name', 'rating']
