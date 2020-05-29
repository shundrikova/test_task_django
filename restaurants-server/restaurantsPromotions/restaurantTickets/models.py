from django.db import models


class User(models.Model):
    user_name = models.CharField(max_length=255)
    user_password = models.CharField(max_length=255)

    def __str__(self):
        return self.user_name


class Restaurant(models.Model):
    restaurant_name = models.CharField("Restaurant name", max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.restaurant_name


class Ticket(models.Model):
    ticket_name = models.CharField(max_length=30)
    max_purchase_count = models.IntegerField()
    purchases = models.IntegerField()
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    def __str__(self):
        return self.ticket_name
