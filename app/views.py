from django.http import HttpResponse
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from app.froms import HotelForm
from . models import *
from . serializer import *
# Create your views here.


class ReactView(APIView):
    def get(self, request):
        output = [{'employee': output.employee,
                   'department': output.department}
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
        return render(request, 'dimages.html', {'hotel_images': Hotels})
