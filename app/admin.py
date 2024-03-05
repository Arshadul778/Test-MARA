from django.contrib import admin
from . import models

# Register your models here.


@admin.register(models.React)
class ReactAdmin(admin.ModelAdmin):
    list_display = ['name', 'department', 'count']


@admin.register(models.Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'rating']
