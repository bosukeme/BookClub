# Generated by Django 5.0.6 on 2024-06-08 21:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("books", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="book",
            name="image_url",
            field=models.CharField(max_length=500, null=True),
        ),
    ]