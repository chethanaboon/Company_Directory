from django.test import TestCase
from django.urls import reverse


class URLTests(TestCase):
    def test_company_list_url(self):
        url = reverse('company-list')
        self.assertEqual(url, '/api/companies/')

    def test_company_detail_url(self):
        url = reverse('company-detail', args=[1])
        self.assertEqual(url, '/api/companies/1/')

    def test_company_locations_url(self):
        url = reverse('company-locations', args=[1])
        self.assertEqual(url, '/api/companies/1/locations/')

    def test_swagger_url(self):
        url = reverse('schema-swagger-ui')
        self.assertEqual(url, '/api/swagger/')

    def test_redoc_url(self):
        url = reverse('schema-redoc')
        self.assertEqual(url, '/api/redoc/')