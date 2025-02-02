import csv
from django.core.management.base import BaseCommand
from api.models import Company, Location


class Command(BaseCommand):
    help = 'Import data from the provided CSV files (companies.csv and locations.csv) to Django models'

    def handle(self, *args, **kwargs):

        with open('companies.csv', 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                Company.objects.create(
                    company_id=row['company_id'],
                    name=row['name'],
                    address=row['address'],
                    latitude=float(row['latitude']),
                    longitude=float(row['longitude'])
                )
        
        with open('locations.csv', 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                Location.objects.create(
                    location_id=row['location_id'],
                    company_id=row['company_id'],
                    name=row['name'],
                    address=row['address'],
                    latitude=float(row['latitude']),
                    longitude=float(row['longitude'])
                )
        
        self.stdout.write(self.style.SUCCESS('Successfully imported CSV data to models'))