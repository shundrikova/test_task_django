import concurrent.futures
import logging
import random
import threading
from asyncio import sleep

from django.test import TestCase, Client
from rest_framework import status
from rest_framework.utils import json
from threading import Thread

from .models import Restaurant, Ticket, User
from .serializers import TicketsSerializer, RestaurantSerializer

client = Client()

correct_ticket_sell = 0


class UserSignUpTestCase(TestCase):
    """ Test module for user signup API """

    def setUp(self):
        self.valid_payload = {
            'user_name': 'user1',
            'user_password': '123456'
        }
        self.invalid_payload = {
            'user_name': '',
            'user_password': '123456'
        }

    def test_create_valid_restaurant(self):
        response = client.post('/api/signup/', data=json.dumps(self.valid_payload),
                               content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_valid_restaurant(self):
        response = client.post('/api/signup/', data=json.dumps(self.invalid_payload),
                               content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UserLoginTestCase(TestCase):
    """ Test module for user login API """

    def setUp(self):
        User.objects.create(user_name="user1", user_password='123456')
        self.valid_payload = {
            'user_name': 'user1',
            'user_password': '123456'
        }
        self.invalid_payload = {
            'user_name': 'user1',
            'user_password': '1234567'
        }

    def test_create_valid_restaurant(self):
        response = client.post('/api/login/', data=json.dumps(self.valid_payload),
                               content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_valid_restaurant(self):
        response = client.post('/api/login/', data=json.dumps(self.invalid_payload),
                               content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class GetRestaurantsTestCase(TestCase):
    """ Test module for GET Restaurant by user id API """

    def setUp(self):
        User.objects.create(user_name="user1", user_password='123456')
        Restaurant.objects.create(restaurant_name="test restaurant 1", user=User.objects.get(id=1))

        User.objects.create(user_name="user2", user_password='123456')
        Restaurant.objects.create(restaurant_name="test restaurant 2", user=User.objects.get(id=2))

    def test__get_restaurant(self):
        user = User.objects.get(id=1)
        restaurants = Restaurant.objects.all().filter(user=user)
        response = client.get('/api/restaurants/1/')
        serializer = RestaurantSerializer(restaurants, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class CreateRestaurantTest(TestCase):
    """ Test module for inserting a new restaurant """

    def setUp(self):
        User.objects.create(user_name="user1", user_password='123456')
        self.valid_payload = {
            'restaurant_name': 'test restaurant 2',
            'user_id': 1
        }
        self.invalid_payload = {
            'restaurant_name': '',
            'user_id': 1
        }

    def test_create_valid_restaurant(self):
        response = client.post('/api/restaurant/', data=json.dumps(self.valid_payload),
                               content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_valid_restaurant(self):
        response = client.post('/api/restaurant/', data=json.dumps(self.invalid_payload),
                               content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class GetTicketsTestCase(TestCase):
    """ Test module for GET Tickets API """

    def setUp(self):
        User.objects.create(user_name="user1", user_password='123456')
        Restaurant.objects.create(restaurant_name="test restaurant 1", user=User.objects.get(id=1))
        Ticket.objects.create(ticket_name="ticket 1", max_purchase_count=50, purchases=0,
                              restaurant=Restaurant.objects.get(id=1))

    def test__get_tickets(self):
        restaurant = Restaurant.objects.get(id=1)
        tickets = Ticket.objects.all().filter(restaurant=restaurant)
        response = client.get('/api/tickets/1/')
        serializer = TicketsSerializer(tickets, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetOneTicketsTestCase(TestCase):
    """ Test module for GET single ticket API """

    def setUp(self):
        User.objects.create(user_name="user1", user_password='123456')
        Restaurant.objects.create(restaurant_name="test restaurant 1", user=User.objects.get(id=1))
        Ticket.objects.create(ticket_name="ticket 1", max_purchase_count=50, purchases=0,
                              restaurant=Restaurant.objects.get(id=1))

    def test_get_valid_single_ticket(self):
        response = client.get('/api/ticket/1/')
        ticket = Ticket.objects.get(id=1)
        serializer = TicketsSerializer(ticket)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_ticket(self):
        response = client.get('/api/ticket/30/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateTicketTest(TestCase):
    """ Test module for inserting a new ticket """

    def setUp(self):
        User.objects.create(user_name="user1", user_password='123456')
        Restaurant.objects.create(restaurant_name="test restaurant 1", user=User.objects.get(id=1))
        self.valid_payload = {
            'ticket_name': 'ticket 2',
            'max_purchase_count': 50,
            'purchases': 0,
            'restaurant': 1
        }
        self.invalid_payload = {
            'ticket_name': '',
            'max_purchase_count': 50,
            'purchases': 0,
            'restaurant': 1
        }

    def test_create_valid_ticket(self):
        response = client.post('/api/ticket/', data=json.dumps(self.valid_payload),
                               content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_valid_ticket(self):
        response = client.post('/api/ticket/', data=json.dumps(self.invalid_payload),
                               content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSingleTicketTest(TestCase):
    """ Test module for updating an existing ticket record """

    def setUp(self):
        User.objects.create(user_name="user1", user_password='123456')
        Restaurant.objects.create(restaurant_name="test restaurant 1", user=User.objects.get(id=1))
        self.ticket1 = Ticket.objects.create(ticket_name="ticket 1", max_purchase_count=50, purchases=0,
                                             restaurant=Restaurant.objects.get(id=1))
        self.valid_payload = {
            'ticket_name': 'ticket 2',
            'max_purchase_count': 50,
            'purchases': 0,
            'restaurant': 1
        }

    def test_valid_update_ticket(self):
        response = client.put(
            '/api/ticket/1/',
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class DeleteSingleTicketTest(TestCase):
    """ Test module for deleting an existing ticket record """

    def setUp(self):
        User.objects.create(user_name="user1", user_password='123456')
        Restaurant.objects.create(restaurant_name="test restaurant 1", user=User.objects.get(id=1))
        self.ticket1 = Ticket.objects.create(ticket_name="ticket 1", max_purchase_count=50, purchases=0,
                                             restaurant=Restaurant.objects.get(id=1))

    def test_valid_delete_ticket(self):
        response = client.delete('/api/ticket/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_delete_ticket(self):
        response = client.delete('/api/ticket/30/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


def purchase_ticket(self, sleep_time):
    sleep(sleep_time)
    response = client.put('/api/ticket/purchase/1/')
    ticket = Ticket.objects.get(id=1)
    if response.status_code == status.HTTP_200_OK:
        global correct_ticket_sell
        correct_ticket_sell += 1


class PurchaseTicketTest(TestCase):
    """ Test module for purchase ticket """

    def setUp(self):
        User.objects.create(user_name="user1", user_password='123456')
        Restaurant.objects.create(restaurant_name="test restaurant 1", user=User.objects.get(id=1))
        self.ticket1 = Ticket.objects.create(ticket_name="ticket 1", max_purchase_count=4, purchases=0,
                                             restaurant=Restaurant.objects.get(id=1))

    def test_purchase_ticket(self):
        threads = list()

        for index in range(10):
            x = threading.Thread(target=purchase_ticket(self, random.randint(1, 10)), args=())
            threads.append(x)
            x.start()

        for index, thread in enumerate(threads):
            thread.join()

        self.assertEqual(correct_ticket_sell, 4)
