from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics

from app.froms import HotelForm
from . models import *
from . serializer import *
# Create your views here.


class ReactView(APIView):
    def get(self, request):
        output = [{'name': output.name,
                   'department': output.department,
                   'count': output.count}
                  for output in React.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class ReactViewSet(ModelViewSet):
    def get_queryset(self):
        return React.objects.all()

    def get_serializer_class(self):
        return ReactSerializer


# @api_view()
# def holelimageView(request):
#     img = Hotel.objects.all().values()
#     serializer = HotelSerializer(img)
#     return Response(serializer.data)


# Create your views here.


def hotel_image_view(request):

    if request.method == 'POST':
        form = HotelForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('success')
    else:
        form = HotelForm()
        return render(request, 'images.html', {'form': form})


def success(request):
    return HttpResponse('successfully uploaded')

# Python program to view
# for displaying images


def display_hotel_images(request):

    if request.method == 'GET':

        # getting all the objects of hotel.
        Hotels = Hotel.objects.all()
        # return render(request, 'tst.html')
        return render(request, 'dimages.html', {'hotel_images': Hotels})


def display_hotel(request):

    if request.method == 'GET':

        # getting all the objects of hotel.
        Hotels = Hotel.objects.all().values()
        print(Hotels[0].get('name'))
        return render(request, str(Hotels[0].get('name')))
        # return HttpResponse('ok')


class dsView(APIView):
    def get(self, request):
        output = [{'img': str(output[2])}
                  for output in Hotel.objects.all().values_list()]
        print(output)
        return Response(output)


class DisplayView(APIView):
    def get(self, request):
        output = [{
            'id': x[0],
            'name': x[1],
            'url': (x[2]),
            'rating': x[3]
        }
            for x in Hotel.objects.all().values_list()]
        # print(output)
        return Response(output)

# class newhView(generics.ListAPIView):
#     def get(self, request):
#         qset = Hotel.objects.all()
#         seq = HotelSerializer(qset)
#         return Response(seq.data)y


class Hotel_ViewSet(ModelViewSet):
    def get_queryset(self):
        return Hotel.objects.all()

    def get_serializer_class(self):
        return HotelSerializer


@api_view()
def hotel_detail(request, id):
    query = Hotel.objects.get(pk=id)
    hotel = HotelSerializer(query)
    print(hotel.data)
    return Response(hotel.data)


class HotelViewSet(ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


@api_view(['GET', 'PATCH'])
def user(request, id):
    if request.method == 'GET':
        query = React.objects.get(pk=id)
        user_data = ReactSerializer(query)
        return Response(user_data.data)
    elif request.method == 'PATCH':
        data = request.data
        query = React.objects.get(pk=id)
        serializer = ReactSerializ(instance=query, data=data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
        return Response(serializer.data)
