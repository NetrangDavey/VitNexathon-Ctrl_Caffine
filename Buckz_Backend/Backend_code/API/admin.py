from django.contrib import admin
from .models import UserInfo, LoanInfo, LoanListed

# Register models in admin
admin.site.register(UserInfo)
admin.site.register(LoanInfo)
admin.site.register(LoanListed)
