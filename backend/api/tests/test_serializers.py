from django.test import TestCase

from api.serializers import CompanySerializer, LocationSerializer


class SerializerTests(TestCase):
    def setUp(self):
        self.company_data = {
            'company_id': 1,
            'name': "Test Company",
            'address': "123 Test St",
            'latitude': 40.7128,
            'longitude': -74.0060
        }
        self.location_data = {
            'location_id': 1,
            'name': "Test Location",
            'address': "456 Test Ave",
            'latitude': 40.7129,
            'longitude': -74.0061
        }

    def test_company_serializer(self):
        serializer = CompanySerializer(data=self.company_data)
        self.assertTrue(serializer.is_valid())

    def test_location_serializer(self):
        serializer = LocationSerializer(data=self.location_data)
        self.assertTrue(serializer.is_valid())