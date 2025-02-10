from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, name, email, phone, password=None):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(name=name, email=email, phone=phone)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, email, phone, password=None):
        user = self.create_user(name, email, phone, password)
        user.is_admin = True
        user.save(using=self._db)
        return user

class UserInfo(AbstractBaseUser):
    # Fields for UserInfo
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    kyc_status = models.BooleanField(default=False)  # True if verified
    loan_id = models.ForeignKey('LoanInfo', on_delete=models.SET_NULL, null=True, blank=True)  # Can be null if no loan
    applied_loan_status = models.ForeignKey('LoanListed', on_delete=models.SET_NULL, null=True, blank=True)  # Status of loan application
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone']
    objects = UserManager()

    def __str__(self):
        return self.email

class LoanInfo(models.Model):
    # Fields for LoanInfo
    loan_id = models.AutoField(primary_key=True)
    lender_id = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='lent_loans')
    principal = models.DecimalField(max_digits=15, decimal_places=2)  # Decimal type for currency
    rai = models.DecimalField(max_digits=5, decimal_places=2)  # Rate of interest
    tenure = models.DecimalField(max_digits=6, decimal_places=2)
    status = models.CharField(max_length=20, choices=[('Completed', 'Completed'), ('Active', 'Active')])
    loan_type = models.CharField(max_length=20, choices=[('EMI', 'EMI'), ('Interest Only', 'Interest Only')])
    started_at = models.DateTimeField()
    completed_on = models.DateTimeField(null=True, blank=True,auto_now_add=True)

    def __str__(self):
        return f"Loan {self.loan_id} - {self.lender_id.name}"


class LoanListed(models.Model):
    list_id = models.AutoField(primary_key=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    requested_on = models.DateTimeField(auto_now_add=True)
    requester_type = models.CharField(max_length=20, choices=[('Normal', 'Normal'), ('Premium', 'Premium')])

    def __str__(self):
        return f"Loan Request {self.list_id} - {self.requester_type} - {self.amount}"


