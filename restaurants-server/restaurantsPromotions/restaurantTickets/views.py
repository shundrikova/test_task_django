from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.utils import json

from .models import Restaurant, Ticket, User
from .serializers import *


@api_view(['POST'])
def user_signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_login(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = User.objects.get(user_name=request.data['user_name'])
        if user.user_password == serializer.initial_data['user_password']:
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_restaurant(request):
    serializer = RestaurantSerializer(data=request.data)
    if serializer.is_valid():
        restaurant_name = serializer.initial_data['restaurant_name']
        user_id = serializer.initial_data['user_id']
        restaurant = Restaurant(restaurant_name=restaurant_name, user=User.objects.get(id=user_id))
        restaurant.save()
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def user_restaurant_list(request, user_id):
    user = User.objects.get(id=user_id)
    restaurants = Restaurant.objects.all().filter(user=user)
    serializer = RestaurantSerializer(restaurants, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_ticket(request):
    serializer = TicketsSerializer(data=request.data)
    if serializer.is_valid():
        ticket_name = serializer.initial_data['ticket_name']
        max_purchase_count = serializer.initial_data['max_purchase_count']
        purchases = serializer.initial_data['purchases']
        restaurant_id = serializer.initial_data['restaurant_id']
        ticket = Ticket(ticket_name=ticket_name, max_purchase_count=max_purchase_count, purchases=purchases,
                        restaurant=Restaurant.objects.get(id=restaurant_id))

        ticket.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_ticket_list_by_restaurant(request, restaurant_id):
    restaurant = Restaurant.objects.get(id=restaurant_id)
    tickets = Ticket.objects.all().filter(restaurant=restaurant)
    serializer = TicketsSerializer(tickets, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def ticket_detail(request, pk):
    """
 Retrieve, update or delete a ticket by id.
 """
    try:
        ticket = Ticket.objects.get(pk=pk)
    except Ticket.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TicketsSerializer(ticket, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        id = pk
        try:
            request.data['ticket_name']
        except KeyError:
            ticket_name = ticket.ticket_name
        else:
            ticket_name = request.data['ticket_name']

        try:
            request.data['max_purchase_count']
        except KeyError:
            max_purchase_count = ticket.max_purchase_count
        else:
            max_purchase_count = request.data['max_purchase_count']

        ticket = Ticket(id=id, ticket_name=ticket_name, max_purchase_count=max_purchase_count,
                        purchases=ticket.purchases,
                        restaurant=ticket.restaurant)

        ticket.save()
        ticket = Ticket.objects.get(pk=pk)
        serializer = TicketsSerializer(ticket, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'DELETE':
        ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
def ticket_purchase(request, pk):
    try:
        ticket = Ticket.objects.get(pk=pk)
    except Ticket.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = TicketsSerializer(ticket, context={'request': request})

        if ticket.purchases < ticket.max_purchase_count:
            purchases = ticket.purchases + 1
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        ticket = Ticket(id=ticket.id, ticket_name=ticket.ticket_name, max_purchase_count=ticket.max_purchase_count,
                        purchases=purchases,
                        restaurant=ticket.restaurant)
        ticket.save()
        ticket = Ticket.objects.get(pk=pk)
        serializer = TicketsSerializer(ticket, context={'request': request})
        return Response(serializer.data)
