# Generated by Django 3.0.3 on 2020-05-21 09:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_auto_20200521_1553'),
    ]

    operations = [
        migrations.AddField(
            model_name='markup',
            name='text',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='backend.Resource'),
        ),
        migrations.DeleteModel(
            name='MarkupToText',
        ),
    ]
