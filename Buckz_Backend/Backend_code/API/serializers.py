from rest_framework import serializers
from .models import Expense, UserInfo, LoanInfo, LoanListed, Account, PersonalFinance

# Personal finance serializer
class PersonalFinanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalFinance
        fields = ['finance_id', 'monthly_income',  'savings', 'created_at']
        read_only_fields = ['created_at']  # created_at should be read-only
# Loan serializer
class LoanInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanInfo
        fields = ['loan_id', 'lender_id', 'principal', 'rai', 'tenure', 'status', 'loan_type', 'started_at', 'completed_on']
        read_only_fields = ['loan_id', 'completed_on']  # Fields that cannot be changed after creation

    def validate_principal(self, value):
        if value <= 0:
            raise serializers.ValidationError("Principal amount must be greater than zero.")
        return value

    def validate_rai(self, value):
        if value < 0:
            raise serializers.ValidationError("Rate of Interest cannot be negative.")
        return value

    def validate_tenure(self, value):
        if value <= 0:
            raise serializers.ValidationError("Tenure must be a positive number.")
        return value

    def create(self, validated_data):
        return LoanInfo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.lender_id = validated_data.get('lender_id', instance.lender_id)
        instance.principal = validated_data.get('principal', instance.principal)
        instance.rai = validated_data.get('rai', instance.rai)
        instance.tenure = validated_data.get('tenure', instance.tenure)
        instance.status = validated_data.get('status', instance.status)
        instance.loan_type = validated_data.get('loan_type', instance.loan_type)
        instance.started_at = validated_data.get('started_at', instance.started_at)
        instance.completed_on = validated_data.get('completed_on', instance.completed_on)
        instance.save()
        return instance

class LoanListedSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanListed
        fields = ['list_id', 'amount', 'requested_on', 'requester_type']
        read_only_fields = ['list_id', 'requested_on']  # Fields that should not be modified by users

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value

    def create(self, validated_data):
        return LoanListed.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.amount = validated_data.get('amount', instance.amount)
        instance.requester_type = validated_data.get('requester_type', instance.requester_type)
        instance.save()
        return instance

# Accounts serializer
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['account_id', 'account_no', 'balance']
        read_only_fields = ['account_id']  # account_id is auto-generated

class UserInfoSerializer(serializers.ModelSerializer):
    # Nested serializers to include related account, personal finance, and loan information
    account = AccountSerializer(required=False)  # User's account details
    personal_finance = PersonalFinanceSerializer(required=False)  # User's personal finance info
    loan = LoanInfoSerializer(source='loan_id', required=False)  # User's loan information (using loan_id)
    applied_loan_status = LoanListedSerializer(required=False)  # Loan application status (no need for `source` here)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = UserInfo
        fields = ['user_id', 'name', 'email', 'phone', 'kyc_status', 'loan_id', 'applied_loan_status', 'created_at', 'password', 'account', 'personal_finance', 'loan', 'applied_loan_status']
        read_only_fields = ['user_id', 'created_at']  # user_id and created_at should be read-only
        depth = 2  # This will automatically include nested fields like account, personal_finance, etc.

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = UserInfo(**validated_data)
        if password:
            user.set_password(password)  # Set password using the built-in method to hash it
        user.save()

        # Handle Account, PersonalFinance, and Loan creation
        account_data = validated_data.pop('account', None)
        personal_finance_data = validated_data.pop('personal_finance', None)
        loan_data = validated_data.pop('loan', None)
        loan_status_data = validated_data.pop('applied_loan_status', None)

        if account_data:
            account = Account.objects.create(user=user, **account_data)

        if personal_finance_data:
            personal_finance = PersonalFinance.objects.create(user_id=user, **personal_finance_data)

        if loan_data:
            loan = LoanInfo.objects.create(user=user, **loan_data)

        if loan_status_data:
            loan_status = LoanListed.objects.create(**loan_status_data)

        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        
        # Update user fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Handle password update
        if password:
            instance.set_password(password)  # Hash the new password if provided

        instance.save()

        # Handle nested updates for account
        account_data = validated_data.get('account', None)
        if account_data:
            instance.account.balance = account_data.get('balance', instance.account.balance)
            instance.account.save()

        # Handle nested updates for personal finance
        personal_finance_data = validated_data.get('personal_finance', None)
        if personal_finance_data:
            instance.personal_finance.monthly_income = personal_finance_data.get('monthly_income', instance.personal_finance.monthly_income)
            instance.personal_finance.monthly_expense = personal_finance_data.get('monthly_expense', instance.personal_finance.monthly_expense)
            instance.personal_finance.savings = personal_finance_data.get('savings', instance.personal_finance.savings)
            instance.personal_finance.save()

        # Handle nested updates for loan (using loan_id)
        loan_data = validated_data.get('loan', None)
        if loan_data:
            if instance.loan_id:
                instance.loan_id.principal = loan_data.get('principal', instance.loan_id.principal)
                instance.loan_id.rai = loan_data.get('rai', instance.loan_id.rai)
                instance.loan_id.tenure = loan_data.get('tenure', instance.loan_id.tenure)
                instance.loan_id.status = loan_data.get('status', instance.loan_id.status)
                instance.loan_id.loan_type = loan_data.get('loan_type', instance.loan_id.loan_type)
                instance.loan_id.started_at = loan_data.get('started_at', instance.loan_id.started_at)
                instance.loan_id.completed_on = loan_data.get('completed_on', instance.loan_id.completed_on)
                instance.loan_id.save()
            else:
                LoanInfo.objects.create(user=instance, **loan_data)

        # Handle nested updates for loan status
        loan_status_data = validated_data.get('applied_loan_status', None)
        if loan_status_data:
            if instance.applied_loan_status:
                instance.applied_loan_status.amount = loan_status_data.get('amount', instance.applied_loan_status.amount)
                instance.applied_loan_status.requester_type = loan_status_data.get('requester_type', instance.applied_loan_status.requester_type)
                instance.applied_loan_status.save()
            else:
                LoanListed.objects.create(**loan_status_data)

        return instance




# LoanInfo serializer






class ExpenseSerializer(serializers.ModelSerializer):
    finance_details = PersonalFinanceSerializer(read_only=True, source='finance_id')

    class Meta:
        model = Expense
        fields = ['expense_id', 'finance_details', 'amount', 'category', 'type', 'description', 'created_at']
        read_only_fields = ['expense_id', 'created_at']

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Expense amount must be greater than zero.")
        return value
