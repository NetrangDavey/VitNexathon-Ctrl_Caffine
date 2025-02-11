from django.contrib import admin
from .models import UserInfo, LoanInfo, LoanListed,Account,Expense,PersonalFinance

# Register models in admin
admin.site.register(UserInfo)
admin.site.register(LoanInfo)
admin.site.register(LoanListed)
admin.site.register(Account)
admin.site.register(Expense)
admin.site.register(PersonalFinance)
