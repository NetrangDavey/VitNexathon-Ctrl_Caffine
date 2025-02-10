from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserInfoViewSet, LoanInfoViewSet, LoanListedViewSet, LoanStatusViewSet, PaymentHistoryViewSet

# Initialize router
router = DefaultRouter()

# Register viewsets with the router
router.register(r'users', UserInfoViewSet)
router.register(r'loans', LoanInfoViewSet)
router.register(r'loan_requests', LoanListedViewSet)
router.register(r'loan_statuses', LoanStatusViewSet)
router.register(r'payments', PaymentHistoryViewSet)

# Include router-generated URLs
urlpatterns = [
    path('', include(router.urls)),  # API routes
]
