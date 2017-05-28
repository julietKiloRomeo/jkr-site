from django.test import TestCase, Client
from knitting import views


class BasicCase(TestCase):
    def test_create_view(self):
        client = Client()
        response = client.get('/knitting/' )
        self.assertContains(response, 'Frigg')


