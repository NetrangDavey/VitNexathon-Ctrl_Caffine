from rest_framework import serializers
from .models import UserInfo, LoanInfo, LoanListed

class UserInfoSerializer(serializers.ModelSerializer):
    # For update functionality, we can make the password optional (handled separately for security)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = UserInfo
        fields = ['user_id', 'name', 'email', 'phone', 'kyc_status', 'loan_id', 'applied_loan_status', 'created_at', 'password']
        read_only_fields = ['user_id', 'created_at']  # user_id and created_at should be read-only
    
    def create(self, validated_data):
        """Override the create method to handle password hashing"""
        password = validated_data.pop('password', None)
        user = UserInfo(**validated_data)
        if password:
            user.set_password(password)  # Set password using the built-in method to hash it
        user.save()
        return user

    def update(self, instance, validated_data):
        """Override the update method to handle password changes"""
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            instance.set_password(password)  # Hash the new password if provided
        
        instance.save()
        return instance


# LoanInfo serializer
class LoanInfoSerializer(serializers.ModelSerializer):
    # You can specify fields that can be updated or created
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
        # Create loan with the validated data
        return LoanInfo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Update existing loan info
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


# Applied Loan Status serializer

class LoanListedSerializer(serializers.ModelSerializer):
    # You can include additional fields or validation logic here if necessary.
    
    class Meta:
        model = LoanListed
        fields = ['list_id', 'amount', 'requested_on', 'requester_type']
        read_only_fields = ['list_id', 'requested_on']  # Fields that should not be modified by users
    
    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value

    def create(self, validated_data):
        # Create a new LoanListed entry with the validated data
        return LoanListed.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Update an existing LoanListed entry
        instance.amount = validated_data.get('amount', instance.amount)
        instance.requester_type = validated_data.get('requester_type', instance.requester_type)
        instance.save()
        return instance