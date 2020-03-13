from rest_framework import routers
from .api import TestViewSet, CorpusViewSet, ResourceViewSet, ResourceTypeViewSet, AuthorViewSet, LineViewSet, TextToTextViewSet

router = routers.DefaultRouter()
router.register('api/test', TestViewSet, 'test')
router.register('api/corpus', CorpusViewSet, 'corpus')
router.register('api/resource', ResourceViewSet, 'resource')
router.register('api/resourceType', ResourceTypeViewSet, 'resourceType')
router.register('api/author', AuthorViewSet, 'author')
router.register('api/line', LineViewSet, 'line'),
router.register('api/textToText', TextToTextViewSet, 'textToText')


urlpatterns = router.urls
