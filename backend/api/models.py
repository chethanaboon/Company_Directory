from django.db import models


class Company(models.Model):
    company_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name

class Location(models.Model):
    location_id = models.IntegerField(primary_key=True)
    # creating a reverse relation from company to locatios
    company = models.ForeignKey(Company, related_name='locations', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    address = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name