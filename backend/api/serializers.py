from rest_framework import serializers
from .models import Company, Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['location_id', 'name', 'address', 'latitude', 'longitude']

class CompanySerializer(serializers.ModelSerializer):
    locations = LocationSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ['company_id', 'name', 'address', 'latitude', 'longitude', 'locations']