# Generated by Django 5.0.2 on 2024-02-27 00:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('hotel_Main_Img', models.ImageField(default='', upload_to='images/')),
            ],
        ),
        migrations.AlterModelOptions(
            name='react',
            options={'ordering': ['employee']},
        ),
    ]
