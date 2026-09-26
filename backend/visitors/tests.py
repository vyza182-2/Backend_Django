from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Visitor


class VisitorAPITests(APITestCase):
    def test_create_visitor_success_with_full_name(self):
        payload = {
            "full_name": "Shiva",
            "mobile": "9876543210",
            "email": "test@gmail.com"
        }
        response = self.client.post('/api/visitors/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visitor.objects.count(), 1)
        visitor = Visitor.objects.first()
        self.assertEqual(visitor.full_name, "Shiva")
        self.assertEqual(visitor.mobile, "9876543210")
        self.assertEqual(visitor.email, "test@gmail.com")

    def test_create_visitor_success_with_frontend_payload(self):
        payload = {
            "name": "Vyza User",
            "mobile": "+91 9876543210",
            "email": "user@example.com",
            "website": ""
        }
        response = self.client.post('/api/visitor', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Visitor.objects.count(), 1)
        visitor = Visitor.objects.first()
        self.assertEqual(visitor.full_name, "Vyza User")

    def test_honeypot_detection(self):
        payload = {
            "name": "Bot",
            "mobile": "9876543210",
            "email": "bot@example.com",
            "website": "http://spam-link.com"
        }
        response = self.client.post('/api/visitor', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("website", response.data)
        self.assertEqual(Visitor.objects.count(), 0)

    def test_create_visitor_invalid_email(self):
        payload = {
            "full_name": "Shiva",
            "mobile": "9876543210",
            "email": "not-an-email"
        }
        response = self.client.post('/api/visitors/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Visitor.objects.count(), 0)

    def test_list_visitors(self):
        Visitor.objects.create(full_name="Shiva", mobile="9876543210", email="test@gmail.com")
        response = self.client.get('/api/visitors/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

