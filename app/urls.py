from django.urls import path
from django.urls.conf import include
from rest_framework_nested import routers
# from . import views
from pprint import pprint

from app.views import ReactViewSet, hotel_image_view


# router = routers.DefaultRouter()
# # router.register('a/', hotel_image_view(), basename='')
# # router.register('', ReactViewSet, basename='')


# urlpatterns = router.urls

urlpatterns = [
    path('', ReactViewSet.as_view({'get': 'list'})),
    # path('hotel_images/', display_hotel_images, name='hotel_images'),
    # path('image_upload/', hotel_image_view, name='image_upload'),
    # path('success/', success, name='success'),
]
