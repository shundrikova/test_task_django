"""restaurantsPromotions URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from restaurantTickets import views
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/restaurant/$', views.create_restaurant),
    url(r'^api/restaurants/(?P<user_id>[0-9]+)/$', views.user_restaurant_list),
    url(r'^api/signup/$', views.user_signup),
    url(r'^api/login/$', views.user_login),
    url(r'^api/ticket/$', views.create_ticket),
    url(r'^api/tickets/(?P<restaurant_id>[0-9]+)/$', views.get_ticket_list_by_restaurant),
    url(r'^api/ticket/(?P<pk>[0-9]+)/$', views.ticket_detail),
    url(r'^api/ticket/purchase/(?P<pk>[0-9]+)/$', views.ticket_purchase),

]
