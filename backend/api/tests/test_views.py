from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

from api.models import Company, Location


class ViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.company = Company.objects.create(
            company_id=1,
            name="Test Company",
            address="123 Test St",
            latitude=40.7128,
            longitude=-74.0060
        )
        self.location = Location.objects.create(
            location_id=1,
            company=self.company,
            name="Test Location",
            address="456 Test Ave",
            latitude=40.7129,
            longitude=-74.0061
        )

    def test_get_companies(self):
        url = reverse('company-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_company_detail(self):
        url = reverse('company-detail', args=[self.company.company_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Test Company")

    def test_get_company_locations(self):
        url = reverse('company-locations', args=[self.company.company_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)