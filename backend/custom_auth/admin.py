from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group

from .models import CustomUser


# @admin.register(CustomUser)
# class RegisterAdmin(admin.ModelAdmin):
#     list_display = ("id", "username", "email")

class CustomUserAdmin(BaseUserAdmin):
    list_display = ('id', 'username', 'email', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email', 'username')
    ordering = ('id',)

admin.site.register(CustomUser, CustomUserAdmin)

# Unregister the Group model from admin since we're not using it
admin.site.unregister(Group)