from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserInfoViewSet,LoanInfoViewSet,LoanListedViewSet

# Initialize router
router = DefaultRouter()

# Register viewsets with the router
router.register(r'users', UserInfoViewSet)
router.register(r'loans', LoanInfoViewSet)
router.register(r'loan-listed', LoanListedViewSet)

# Include router-generated URLs
urlpatterns = [
    path('', include(router.urls)),  # API routes
]
