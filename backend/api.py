from django.db.models import Q
from backend.models import Relation, Markup, Class, Object, Test, Corpus, Resource, ResourceType, Author, TextToText, Place, CorpusPlaces, CorpusAuthors, TextToText, Entity
from rest_framework import viewsets, permissions
from .serializers import RelationSerializer, MarkupSerializer, ObjectSerializer, ClassSerializer, TestSerializer, CorpusSerializer, ResourceSerializer, ResourceTypeSerializer, AuthorSerializer, TextToTextSerializer, PlaceSerializer, CorpusPlacesSerializer, CorpusAuthorsSerializer, EntitySerializer


perm = permissions.IsAuthenticated
# perm = permissions.AllowAny


class RelationViewSet(viewsets.ModelViewSet):
    queryset = Relation.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = RelationSerializer


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = ClassSerializer


class ObjectViewSet(viewsets.ModelViewSet):
    queryset = Object.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = ObjectSerializer


class EntityViewSet(viewsets.ModelViewSet):
    queryset = Entity.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = EntitySerializer


class CorpusAuthorsViewSet(viewsets.ModelViewSet):
    queryset = CorpusAuthors.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = CorpusAuthorsSerializer


class CorpusPlacesViewSet(viewsets.ModelViewSet):
    queryset = CorpusPlaces.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = CorpusPlacesSerializer


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = PlaceSerializer

# TestViewSet


class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = TestSerializer


class CorpusViewSet(viewsets.ModelViewSet):
    queryset = Corpus.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = CorpusSerializer


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = ResourceSerializer


class ResourceTypeViewSet(viewsets.ModelViewSet):
    queryset = ResourceType.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = ResourceTypeSerializer


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = AuthorSerializer


class TextToTextViewSet(viewsets.ModelViewSet):
    queryset = TextToText.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = TextToTextSerializer


class MarkupViewSet(viewsets.ModelViewSet):
    queryset = Markup.objects.all()
    permission_classes = [
        perm
    ]

    serializer_class = MarkupSerializer
