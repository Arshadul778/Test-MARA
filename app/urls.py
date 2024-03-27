from django.urls import path
from django.urls.conf import include
from rest_framework_nested import routers
from pprint import pprint

from app.views import *

# router = routers.DefaultRouter()
# # router.register('a/', hotel_image_view(), basename='')
# # router.register('', ReactViewSet, basename='')


# urlpatterns = router.urls
router = routers.DefaultRouter()
router.register(r'images', HotelViewSet)
router.register(r'models', ModelsViewSet)
router.register(r'rating', RatingViewset)


urlpatterns = [
    path('', ReactViewSet.as_view({'get': 'list'})),
    path('users/<id>/', user, name='see'),
    path('login/', login_page, name='Login'),
    path('register/', register_page, name='Register'),
    path('logout/', logout_page, name='Logout'),
    path('get/', get_rating, name='get'),
    # path('hotels/<id>/', hotel_detail, name='hotel_detail'),
    # path('hotel_images_see/', DisplayView.as_view()),
    # path('images/', Hotel_ViewSet.as_view({'get': 'list'})),
    # path('hotels/<id>/', hotel_detail, name='hotel_detail'),
    # path('image_upload/', hotel_image_view, name='image_upload'),
    # path('success/', success, name='success'),
]

urlpatterns += router.urls
