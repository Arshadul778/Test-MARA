from rest_framework import serializers
from . models import *


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['name', 'department', 'count']


class ReactSerializ(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['count']


class HotelSerializer(serializers.ModelSerializer):
    hotel_Main_Img = serializers.ImageField(use_url=True)

    class Meta:
        model = Hotel
        fields = '__all__'


# class HotelSerializer(serializers.Serializer):
#     hotel_Main_Img = serializers.ImageField()


# # class HotelSerializer(serializers.ModelSerializer):
#     hotel_Main_Img_url = serializers.SerializerMethodField()

#     class Meta:
#         model = Hotel
#         fields = ['hotel_Main_Img_url']

#     def get_hotel_Main_Img_url(self, obj):
#         print(obj)
#         if obj.hotel_Main_Img:
#             return self.context['request'].build_absolute_uri(obj.hotel_Main_Img.url)
#         return None
