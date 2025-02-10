from rest_framework import serializers
from .models import UserInfo, LoanInfo, LoanListed, LoanStatus, PaymentHistory

# Serializer for UserInfo model
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['user_id', 'name', 'email', 'phone','password','kyc_status', 'loan_id', 'applied_loan_status', 'created_at']

# Serializer for LoanInfo model
class LoanInfoSerializer(serializers.ModelSerializer):
    borrower_id = UserInfoSerializer()  # Nested serializer for borrower details
    lender_id = UserInfoSerializer()  # Nested serializer for lender details

    class Meta:
        model = LoanInfo
        fields = ['loan_id', 'borrower_id', 'lender_id', 'principal', 'rai', 'tenure', 'status', 'loan_type', 'started_at', 'completed_on']

# Serializer for LoanListed model
class LoanListedSerializer(serializers.ModelSerializer):
    requester_id = UserInfoSerializer()  # Nested serializer for requester details

    class Meta:
        model = LoanListed
        fields = ['list_id', 'requester_id', 'amount', 'requested_on', 'requester_type']

# Serializer for LoanStatus model
class LoanStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanStatus
        fields = ['id', 'status']

# Serializer for PaymentHistory model
class PaymentHistorySerializer(serializers.ModelSerializer):
    loan = LoanInfoSerializer()  # Nested serializer for loan details

    class Meta:
        model = PaymentHistory
        fields = ['loan', 'payment_date', 'amount_paid', 'payment_type', 'remaining_balance']
