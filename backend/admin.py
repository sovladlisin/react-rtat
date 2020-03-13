from django.contrib import admin
from django.db import models
from backend.models import Test, Resource


class TestAdminModel(admin.ModelAdmin):
    model = Test


class ResourceAdmin(admin.ModelAdmin):
    model = Resource


admin.site.register(Test, TestAdminModel)
admin.site.register(Resource, ResourceAdmin)
