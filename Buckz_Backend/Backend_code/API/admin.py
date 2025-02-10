from django.contrib import admin
from .models import UserInfo, LoanInfo, LoanListed, LoanStatus, PaymentHistory

# Register models in admin
admin.site.register(UserInfo)
admin.site.register(LoanInfo)
admin.site.register(LoanListed)
admin.site.register(LoanStatus)
admin.site.register(PaymentHistory)
