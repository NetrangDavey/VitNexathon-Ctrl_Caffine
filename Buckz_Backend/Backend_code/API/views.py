from rest_framework import viewsets
from .models import UserInfo, LoanInfo, LoanListed, LoanStatus, PaymentHistory
from .serializers import UserInfoSerializer, LoanInfoSerializer, LoanListedSerializer, LoanStatusSerializer, PaymentHistorySerializer

# ViewSet for UserInfo
class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer

# ViewSet for LoanInfo
class LoanInfoViewSet(viewsets.ModelViewSet):
    queryset = LoanInfo.objects.all()
    serializer_class = LoanInfoSerializer

# ViewSet for LoanListed
class LoanListedViewSet(viewsets.ModelViewSet):
    queryset = LoanListed.objects.all()
    serializer_class = LoanListedSerializer

# ViewSet for LoanStatus
class LoanStatusViewSet(viewsets.ModelViewSet):
    queryset = LoanStatus.objects.all()
    serializer_class = LoanStatusSerializer

# ViewSet for PaymentHistory
class PaymentHistoryViewSet(viewsets.ModelViewSet):
    queryset = PaymentHistory.objects.all()
    serializer_class = PaymentHistorySerializer
