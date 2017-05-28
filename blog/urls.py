from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^/(?P<slug>[a-zA-Z0-9\-]*)/?$', views.post_detail, name='post_detail'),
]