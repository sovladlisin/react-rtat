from rest_framework import serializers
from backend.models import Test, Corpus, Resource, ResourceType, Author, Line, TextToText


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'


class TextToTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextToText
        fields = '__all__'


class CorpusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Corpus
        fields = '__all__'


class ResourceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resource
        fields = '__all__'


class ResourceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceType
        fields = '__all__'


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = '__all__'
