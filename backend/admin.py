from django.contrib import admin
from django.db import models
from backend.models import Test, Resource, Author


class TestAdminModel(admin.ModelAdmin):
    model = Test


class ResourceAdmin(admin.ModelAdmin):
    model = Resource


class AuthorAdmin(admin.ModelAdmin):
    model = Author


admin.site.register(Test, TestAdminModel)
admin.site.register(Resource, ResourceAdmin)
admin.site.register(Author, AuthorAdmin)
