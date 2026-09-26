from django.contrib import admin
from .models import Visitor


@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'email', 'mobile', 'created_at')
    list_display_links = ('id', 'full_name')
    list_filter = ('created_at',)
    search_fields = ('full_name', 'email', 'mobile')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    list_per_page = 25

