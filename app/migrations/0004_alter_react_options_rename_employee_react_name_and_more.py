# Generated by Django 5.0.2 on 2024-03-04 23:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_hotel_rating'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='react',
            options={'ordering': ['name']},
        ),
        migrations.RenameField(
            model_name='react',
            old_name='employee',
            new_name='name',
        ),
        migrations.AddField(
            model_name='react',
            name='count',
            field=models.IntegerField(default=0),
        ),
    ]
