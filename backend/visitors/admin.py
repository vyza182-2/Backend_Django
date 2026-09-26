from django.contrib import admin
from django.utils.html import format_html
from .models import Visitor

# Custom Admin Site Branding
admin.site.site_header = "VYZA • Production Control Center"
admin.site.site_title = "Vyza Admin"
admin.site.index_title = "Portfolio Management & Analytics"


@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'formatted_email', 'formatted_mobile', 'badge_created_at')
    list_display_links = ('id', 'full_name')
    list_filter = ('created_at',)
    search_fields = ('full_name', 'email', 'mobile')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    list_per_page = 25

    @admin.display(description="Email Address", ordering="email")
    def formatted_email(self, obj):
        return format_html('<a href="mailto:{}" style="color: #38bdf8; text-decoration: none;">📧 {}</a>', obj.email, obj.email)

    @admin.display(description="Mobile Number", ordering="mobile")
    def formatted_mobile(self, obj):
        return format_html('<a href="tel:{}" style="color: #34d399; text-decoration: none;">📱 {}</a>', obj.mobile, obj.mobile)

    @admin.display(description="Registered At", ordering="created_at")
    def badge_created_at(self, obj):
        formatted_time = obj.created_at.strftime("%b %d, %Y • %H:%M")
        return format_html(
            '<span class="vyza-pill vyza-pill-cyan" style="font-size: 0.75rem;">🕒 {}</span>',
            formatted_time
        )


