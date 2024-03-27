from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.sessions.models import Session


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


@api_view(['POST'])
def register_page(request):
    if request.method == 'POST':
        user_name = request.data.get('username')
        f_name = request.data.get('first_name')
        l_name = request.data.get('last_name')
        email = request.data.get('email')
        password = request.data.get('password')

        user = User.objects.filter(username=user_name)
        if user.exists():
            messages.info(request, "User name Already taken!")
            return redirect('Register')

        user = User.objects.create(
            username=user_name,
            first_name=f_name,
            last_name=l_name,
            email=email
        )
        user.set_password(password)
        user.save()

    return redirect('Login')


@api_view(['POST'])
def login_page(request):
    if request.method == 'POST':
        user_name = request.data.get('username')
        password = request.data.get('password')
        # print(user_name, password)
        user_obj = User.objects.filter(username=user_name)
        if (user_obj.exists()) == False:
            messages.info(
                request, "Your Username does not match. Please SignUp.")
            # print(user_name, password)
            return Response(user_name, status=status.HTTP_404_NOT_FOUND)

        user = authenticate(request, username=user_name, password=password)
        # print(user)
        if user is None:
            messages.error(request, "Invalid Password!")
            return Response(user_name, status=status.HTTP_406_NOT_ACCEPTABLE)

        else:
            login(request, user)
            s_key = request.session.session_key
            serilizer = UseridSerializer(User.objects.get(username=user_name))
            return Response({'session_key': s_key, 'user': serilizer.data})

    return redirect('Login')


@api_view(['POST'])
def logout_page(request):
    # print(request.session.session_key)
    if request.method == 'POST':
        logout(request)
        session = Session.objects.get(
            session_key=request.data.get('session_key'))
        session.delete()
        return Response({'message': 'Logged out successfully.'})


@api_view()
def home_page(request):
    return Response('newfjsrb')
# -------------------------


class ModelsViewSet(ModelViewSet):
    queryset = Models.objects.all()
    serializer_class = ModelsSerializer


class RatingViewset(ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


@api_view(['POST'])
def get_rating(request):
    if request.method == 'POST':
        user_id = request.data.get('u_id')
        model_id = request.data.get('m_id')
        print(user_id, model_id)
        try:
            query = Rating.objects.get(user_id=user_id, model_name_id=model_id)
            ser = RatingSerializer(query)
            return Response(ser.data)
        except Rating.DoesNotExist:
            try:
                rating_obj = Rating.objects.create(
                    user_id=user_id,
                    model_name_id=model_id
                )
                rating_obj.save()
                ser = RatingSerializer(rating_obj)
                # print(rating_obj.id, 1234)
                return Response(ser.data)
            except Exception as e:
                return Response({"message": "Forign key error"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        return Response({"message": "Request not valid"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PATCH'])
def update_rating(request):
    pass
