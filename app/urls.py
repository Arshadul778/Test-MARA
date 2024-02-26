from django.urls import path
from django.urls.conf import include
from rest_framework_nested import routers
# from . import views
from pprint import pprint

from app.views import ReactViewSet


router = routers.DefaultRouter()
router.register('', ReactViewSet, basename='')


urlpatterns = router.urls
