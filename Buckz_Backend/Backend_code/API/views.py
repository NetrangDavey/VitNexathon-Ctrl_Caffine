from rest_framework import viewsets
from rest_framework import viewsets
from .models import Account, Expense, PersonalFinance, UserInfo, LoanInfo, LoanListed
from .serializers import AccountSerializer, ExpenseSerializer, PersonalFinanceSerializer, UserInfoSerializer,LoanInfoSerializer,LoanListedSerializer

class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer

    def create(self, request, *args, **kwargs):
        # Handle user creation
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        # Handle user update
        return super().update(request, *args, **kwargs)


# Loan View

class LoanInfoViewSet(viewsets.ModelViewSet):
    queryset = LoanInfo.objects.all()  # Defines the queryset to be used in all actions
    serializer_class = LoanInfoSerializer  # Specifies the serializer for LoanInfo model

    def perform_create(self, serializer):
        # Custom logic for creating a LoanInfo instance (if needed)
        serializer.save()

    def perform_update(self, serializer):
        # Custom logic for updating a LoanInfo instance (if needed)
        serializer.save()



# applied loan status view
class LoanListedViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting loan listing requests.
    """
    queryset = LoanListed.objects.all()  # Retrieve all loan listed requests
    serializer_class = LoanListedSerializer  # Use the LoanListed serializer
     # Ensure the user is authenticated

    def perform_create(self, serializer):
        """
        Override perform_create to associate the currently authenticated user
        with the loan listed request (if necessary).
        """
        # No 'requester_id' is present in the LoanListed model. So no need to assign it.
        serializer.save()  # Save the loan listed entry without needing the requester_id

    def perform_update(self, serializer):
        """
        Override perform_update to customize loan listed request updates.
        """
        serializer.save()


class PersonalFinanceViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting personal finance records.
    """
    queryset = PersonalFinance.objects.all()  # Retrieve all personal finance records
    serializer_class = PersonalFinanceSerializer  # Use the PersonalFinance serializer

    def perform_create(self, serializer):
        """
        Override perform_create to handle custom logic for creating a personal finance record.
        """
        serializer.save()  # Save the personal finance record

    def perform_update(self, serializer):
        """
        Override perform_update to handle custom logic for updating a personal finance record.
        """
        serializer.save()  # Save the updated personal finance record


class AccountViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting account records.
    """
    queryset = Account.objects.all()  # Retrieve all account records
    serializer_class = AccountSerializer  # Use the Account serializer

    def perform_create(self, serializer):
        """
        Override perform_create to handle custom logic for creating an account.
        """
        serializer.save()  # Save the account record

    def perform_update(self, serializer):
        """
        Override perform_update to handle custom logic for updating an account.
        """
        serializer.save()  # Save the updated account record


class ExpenseViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting expense records.
    """
    queryset = Expense.objects.all()  # Retrieve all expense records
    serializer_class = ExpenseSerializer  # Use the Expense serializer

    def perform_create(self, serializer):
        """
        Override perform_create to handle custom logic for creating an expense record.
        """
        serializer.save()  # Save the expense record

    def perform_update(self, serializer):
        """
        Override perform_update to handle custom logic for updating an expense record.
        """
        serializer.save()  # Save the updated expense record