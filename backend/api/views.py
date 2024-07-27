from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
import logging

from .models import Company, Location
from .serializers import CompanySerializer, LocationSerializer


logger = logging.getLogger(__name__)

class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def list(self, request, *args, **kwargs):
        try:
            response = super().list(request, *args, **kwargs)
            logger.info(f"Retrieved list of companies. Status code: {response.status_code}")
            return response
        except Exception as e:
            logger.error(f"Error retrieving list of companies: {str(e)}")
            return Response({'error': 'An error occurred while retrieving the list of companies.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, *args, **kwargs):
        try:
            response = super().retrieve(request, *args, **kwargs)
            logger.info(f"Retrieved company with id {kwargs['pk']}. Status code: {response.status_code}")
            return response
        except Exception as e:
            logger.error(f"Error retrieving company with id {kwargs['pk']}: {str(e)}")
            return Response({'error': 'An error occurred while retrieving the company.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['get'])
    def locations(self, request, pk=None):
        try:
            company = self.get_object()
            locations = company.locations.all()
            serializer = LocationSerializer(locations, many=True)
            logger.info(f"Successfully retrieved locations for company with id {pk}.")
            return Response(serializer.data)
        except Company.DoesNotExist:
            logger.error(f"Company with id {pk} does not exist.")
            return Response({'error': 'Company not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error fetching locations for company {pk}: {str(e)}")
            return Response({'error': 'An error occurred while fetching the locations.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)