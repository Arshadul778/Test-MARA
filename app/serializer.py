from rest_framework import serializers
from . models import *


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['id', 'name', 'department', 'count']


class ReactSerializ(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['count']


class HotelSerializer(serializers.ModelSerializer):
    hotel_Main_Img = serializers.ImageField(use_url=True)

    class Meta:
        model = Hotel
        fields = '__all__'


class ModelsSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(use_url=True)

    class Meta:
        model = Models
        fields = ['id', 'name', 'img', 'discriptions']


class ModelsS(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = Models
        fields = ['id', 'name', 'img']

    def get_img(self, obj):
        # Assuming your API domain is fixed and your media URL is /media/
        request = self.context.get('request')
        if obj.img:
            print(2)
            return request.build_absolute_uri(obj.img.url)
        return None


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = ['id', 'user', 'model_name', 'rating']
    user = UserSerializer()
    model_name = ModelsSerializer()


class UseridSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']


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
