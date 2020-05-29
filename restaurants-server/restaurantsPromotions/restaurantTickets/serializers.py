from rest_framework import serializers
from .models import Restaurant, User
from .models import Ticket


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('id', 'restaurant_name')


class TicketsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('id', 'ticket_name', 'max_purchase_count', 'purchases', 'restaurant_id')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'user_name', 'user_password')
