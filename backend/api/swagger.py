from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="Company Directory API",
        default_version='v1',
        description="API documentation for the Company Directory project",
        # terms_of_service="",
        contact=openapi.Contact(email="benny.c@northeastern.edu"),
        # license=openapi.License(name=""),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)