from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# Initialize router
router = DefaultRouter()

# Register viewsets with the router
router.register(r'users', UserInfoViewSet)
router.register(r'loans', LoanInfoViewSet)
router.register(r'loan-listed', LoanListedViewSet)
router.register(r'personal_finances', PersonalFinanceViewSet)
router.register(r'accounts', AccountViewSet)
router.register(r'expenses', ExpenseViewSet)

# Include router-generated URLs
urlpatterns = [
    path('', include(router.urls)),  # API routes
]
