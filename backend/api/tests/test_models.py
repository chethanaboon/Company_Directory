from django.test import TestCase

from api.models import Company, Location


class ModelTests(TestCase):
    def setUp(self):
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

    def test_company_model(self):
        self.assertEqual(str(self.company), "Test Company")

    def test_location_model(self):
        self.assertEqual(str(self.location), "Test Location")