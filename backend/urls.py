from rest_framework import routers
from .api import ClassViewSet, ObjectViewSet, TestViewSet, CorpusViewSet, ResourceViewSet, ResourceTypeViewSet, AuthorViewSet, TextToTextViewSet, PlaceViewSet, CorpusPlacesViewSet, CorpusAuthorsViewSet, EntityViewSet

router = routers.DefaultRouter()
router.register('api/test', TestViewSet, 'test')
router.register('api/corpus', CorpusViewSet, 'corpus')
router.register('api/resource', ResourceViewSet, 'resource')
router.register('api/resourceType', ResourceTypeViewSet, 'resourceType')
router.register('api/author', AuthorViewSet, 'author')
router.register('api/textToText', TextToTextViewSet, 'textToText')
router.register('api/place', PlaceViewSet, 'place')
router.register('api/corpusPlaces', CorpusPlacesViewSet, 'corpusPlaces')
router.register('api/corpusAuthors', CorpusAuthorsViewSet, 'corpusAuthors')
router.register('api/entity', EntityViewSet, 'entity')
router.register('api/class', ClassViewSet, 'class')
router.register('api/object', ObjectViewSet, 'object')


urlpatterns = router.urls
