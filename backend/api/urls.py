from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet
from .swagger import schema_view


router = DefaultRouter()
router.register(r'companies', CompanyViewSet)

urlpatterns = [
    # api routes
    path('', include(router.urls)),
    # documentation routes
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]