from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Company, Location
from .serializers import CompanySerializer, LocationSerializer


class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    @action(detail=True, methods=['get'])
    def locations(self, request, pk=None):
        company = self.get_object()
        locations = company.locations.all()
        serializer = LocationSerializer(locations, many=True)
        return Response(serializer.data)