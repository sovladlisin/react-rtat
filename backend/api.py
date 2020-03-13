from backend.models import Test, Corpus, Resource, ResourceType, Author, Line, TextToText
from rest_framework import viewsets, permissions
from .serializers import TestSerializer, CorpusSerializer, ResourceSerializer, ResourceTypeSerializer, AuthorSerializer, LineSerializer, TextToTextSerializer


# TestViewSet
class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = TestSerializer


class CorpusViewSet(viewsets.ModelViewSet):
    queryset = Corpus.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = CorpusSerializer


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ResourceSerializer


class ResourceTypeViewSet(viewsets.ModelViewSet):
    queryset = ResourceType.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ResourceTypeSerializer


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = AuthorSerializer


class LineViewSet(viewsets.ModelViewSet):
    queryset = Line.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = LineSerializer


class TextToTextViewSet(viewsets.ModelViewSet):
    queryset = TextToText.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = TextToTextSerializer
