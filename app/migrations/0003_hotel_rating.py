# Generated by Django 5.0.2 on 2024-03-01 03:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_hotel_alter_react_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='hotel',
            name='rating',
            field=models.IntegerField(default=0),
        ),
    ]
