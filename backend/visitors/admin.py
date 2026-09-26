import csv
import json
import platform
import sys
from datetime import timedelta
from django.contrib import admin, messages
from django.contrib.auth.models import User
from django.utils.html import format_html
from django.utils import timezone
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.urls import path, reverse
from django.db.models.functions import TruncDate
from django.db.models import Count
from django.conf import settings
from .models import Visitor
from .views import send_telegram_notification

# =============================================================
# Custom Admin Site Branding
# =============================================================
admin.site.site_header = "VYZA • Production Control Center"
admin.site.site_title = "Vyza Admin Portal"
admin.site.index_title = "Executive Dashboard & Visitor Intelligence"


# =============================================================
# Global Admin Context Processor: Telemetry & Analytics
# =============================================================
original_each_context = admin.site.each_context


def custom_each_context(request):
    context = original_each_context(request)
    try:
        now = timezone.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        week_start = today_start - timedelta(days=7)
        month_start = today_start - timedelta(days=30)

        total_visitors = Visitor.objects.count()
        today_visitors = Visitor.objects.filter(created_at__gte=today_start).count()
        week_visitors = Visitor.objects.filter(created_at__gte=week_start).count()
        month_visitors = Visitor.objects.filter(created_at__gte=month_start).count()
        recent_visitors = Visitor.objects.all().order_by('-created_at')[:8]

        # 1. Past 7 Days Traffic Trend
        daily_stats = (
            Visitor.objects.filter(created_at__gte=week_start)
            .annotate(date=TruncDate('created_at'))
            .values('date')
            .annotate(count=Count('id'))
            .order_by('date')
        )
        date_map = {item['date'].strftime('%b %d'): item['count'] for item in daily_stats if item['date']}
        chart_labels = []
        chart_data = []
        for i in range(6, -1, -1):
            day = (now - timedelta(days=i)).strftime('%b %d')
            chart_labels.append(day)
            chart_data.append(date_map.get(day, 0))

        # 2. Email Provider Distribution
        email_domains = {'Gmail': 0, 'Outlook / Hotmail': 0, 'Yahoo': 0, 'Corporate / Other': 0}
        for v in Visitor.objects.all().only('email'):
            domain = v.email.split('@')[-1].lower() if '@' in v.email else ''
            if 'gmail' in domain:
                email_domains['Gmail'] += 1
            elif any(d in domain for d in ['outlook', 'hotmail', 'live', 'msn']):
                email_domains['Outlook / Hotmail'] += 1
            elif 'yahoo' in domain:
                email_domains['Yahoo'] += 1
            else:
                email_domains['Corporate / Other'] += 1

        # 3. System Telemetry
        db_engine = settings.DATABASES['default']['ENGINE'].split('.')[-1]
        db_name = settings.DATABASES['default'].get('NAME', 'portfolio_db')
        
        system_telemetry = {
            'db_engine': 'PostgreSQL' if 'postgresql' in db_engine else 'SQLite',
            'db_name': str(db_name).split('/')[-1].split('\\')[-1],
            'python_version': f"Python {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}",
            'django_version': "Django 6.0",
            'os_info': f"{platform.system()} {platform.release()}",
            'telegram_bot': "@VyzaNotificationBot",
            'telegram_chat': "7278760428 (Reddy)",
            'domain': "https://vyzareddy.in",
            'server_time': now.strftime('%Y-%m-%d %H:%M:%S UTC'),
            'staff_count': User.objects.filter(is_staff=True).count(),
        }

        context.update({
            'total_visitors': total_visitors,
            'today_visitors': today_visitors,
            'week_visitors': week_visitors,
            'month_visitors': month_visitors,
            'recent_visitors': recent_visitors,
            'chart_labels_json': json.dumps(chart_labels),
            'chart_data_json': json.dumps(chart_data),
            'email_labels_json': json.dumps(list(email_domains.keys())),
            'email_data_json': json.dumps(list(email_domains.values())),
            'telemetry': system_telemetry,
        })
    except Exception as e:
        context['analytics_error'] = str(e)
    return context


admin.site.each_context = custom_each_context


# =============================================================
# Custom Admin Site Actions & Helper Endpoints
# =============================================================
@admin.action(description="📥 Export Selected Visitors to CSV")
def export_as_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="vyza_visitors_export.csv"'
    writer = csv.writer(response)
    writer.writerow(['ID', 'Full Name', 'Email', 'Mobile', 'Created At (UTC)'])
    for obj in queryset:
        writer.writerow([obj.id, obj.full_name, obj.email, obj.mobile, obj.created_at.strftime('%Y-%m-%d %H:%M:%S')])
    return response


@admin.action(description="📋 Export Selected Visitors to JSON")
def export_as_json(modeladmin, request, queryset):
    data = [
        {
            'id': obj.id,
            'full_name': obj.full_name,
            'email': obj.email,
            'mobile': obj.mobile,
            'created_at': obj.created_at.strftime('%Y-%m-%d %H:%M:%S UTC'),
        }
        for obj in queryset
    ]
    response = JsonResponse(data, safe=False, json_dumps_params={'indent': 2})
    response['Content-Disposition'] = 'attachment; filename="vyza_visitors_export.json"'
    return response


@admin.action(description="📢 Resend Telegram Alert for Selected Visitors")
def resend_telegram_alert(modeladmin, request, queryset):
    count = 0
    for obj in queryset:
        send_telegram_notification(obj)
        count += 1
    modeladmin.message_user(request, f"🚀 Successfully broadcasted Telegram alerts for {count} visitor(s).")


# Hook custom global URLs into the admin site
original_get_urls = admin.site.get_urls


def custom_get_urls():
    urls = original_get_urls()
    
    def test_telegram_view(request):
        # Create a mock or test visitor trigger
        class DummyVisitor:
            id = "TEST-ADMIN"
            full_name = f"Admin Test ({request.user.username})"
            email = request.user.email or "admin@vyzareddy.in"
            mobile = "+91 9999999999"
            created_at = timezone.now()
        
        send_telegram_notification(DummyVisitor())
        messages.success(request, "⚡ Test Telegram Notification dispatched successfully to @VyzaNotificationBot (Chat: 7278760428)!")
        return HttpResponseRedirect(reverse('admin:index'))

    def export_all_csv_view(request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="vyza_all_visitors.csv"'
        writer = csv.writer(response)
        writer.writerow(['ID', 'Full Name', 'Email', 'Mobile', 'Created At (UTC)'])
        for obj in Visitor.objects.all().order_by('-created_at'):
            writer.writerow([obj.id, obj.full_name, obj.email, obj.mobile, obj.created_at.strftime('%Y-%m-%d %H:%M:%S')])
        return response

    custom_urls = [
        path('test-telegram/', admin.site.admin_view(test_telegram_view), name='vyza_test_telegram'),
        path('export-all-visitors-csv/', admin.site.admin_view(export_all_csv_view), name='vyza_export_all_csv'),
    ]
    return custom_urls + urls


admin.site.get_urls = custom_get_urls


# =============================================================
# Enhanced ModelAdmin for Visitor
# =============================================================
@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
    list_display = (
        'visitor_id_badge',
        'visitor_profile',
        'formatted_email',
        'formatted_mobile',
        'badge_created_at',
        'outreach_actions',
    )
    list_display_links = ('visitor_id_badge', 'visitor_profile')
    list_filter = ('created_at',)
    search_fields = ('full_name', 'email', 'mobile', 'id')
    ordering = ('-created_at',)
    readonly_fields = ('id', 'created_at', 'direct_outreach_panel')
    date_hierarchy = 'created_at'
    list_per_page = 25
    actions = [export_as_csv, export_as_json, resend_telegram_alert]

    fieldsets = (
        ('👤 Visitor Profile Details', {
            'fields': ('full_name', 'email', 'mobile')
        }),
        ('⚡ Instant Direct Outreach', {
            'fields': ('direct_outreach_panel',),
            'classes': ('collapse',),
            'description': 'Direct one-click communication links to reach out to this visitor immediately.'
        }),
        ('🛡️ System Audit & Timestamp', {
            'fields': ('id', 'created_at'),
            'classes': ('collapse',)
        }),
    )

    @admin.display(description="ID", ordering="id")
    def visitor_id_badge(self, obj):
        return format_html(
            '<span style="font-family: \'JetBrains Mono\', monospace; font-weight: 700; color: #38bdf8; background: rgba(56,189,248,0.1); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(56,189,248,0.25);">#{}</span>',
            obj.id
        )

    @admin.display(description="Visitor Name", ordering="full_name")
    def visitor_profile(self, obj):
        initial = obj.full_name.strip()[:1].upper() if obj.full_name else 'V'
        colors = ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#fbbf24']
        color = colors[obj.id % len(colors)]
        return format_html(
            '<div style="display: flex; align-items: center; gap: 10px;">'
            '<div style="width: 32px; height: 32px; border-radius: 50%; background: {0}22; border: 1.5px solid {0}; color: {0}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem;">{1}</div>'
            '<div><div style="font-weight: 700; color: #f8fafc; font-size: 0.92rem;">{2}</div></div>'
            '</div>',
            color, initial, obj.full_name
        )

    @admin.display(description="Email Address", ordering="email")
    def formatted_email(self, obj):
        return format_html(
            '<a href="mailto:{}" style="color: #38bdf8; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 5px;">'
            '✉️ <span>{}</span>'
            '</a>',
            obj.email, obj.email
        )

    @admin.display(description="Mobile Number", ordering="mobile")
    def formatted_mobile(self, obj):
        clean_num = ''.join(c for c in obj.mobile if c.isdigit() or c == '+')
        wa_num = clean_num.lstrip('+')
        return format_html(
            '<div style="display: flex; align-items: center; gap: 8px;">'
            '<a href="tel:{0}" style="color: #34d399; text-decoration: none; font-weight: 600;">📞 {0}</a>'
            '<a href="https://wa.me/{1}" target="_blank" title="Chat on WhatsApp" style="background: rgba(37,211,102,0.15); border: 1px solid rgba(37,211,102,0.3); color: #25d366; padding: 2px 6px; border-radius: 4px; font-size: 0.72rem; text-decoration: none; font-weight: 700;">💬 WA</a>'
            '</div>',
            obj.mobile, wa_num
        )

    @admin.display(description="Registered At", ordering="created_at")
    def badge_created_at(self, obj):
        formatted_time = obj.created_at.strftime("%b %d, %Y • %H:%M")
        return format_html(
            '<span class="vyza-pill vyza-pill-cyan" style="font-size: 0.75rem;">🕒 {}</span>',
            formatted_time
        )

    @admin.display(description="Quick Outreach")
    def outreach_actions(self, obj):
        clean_num = ''.join(c for c in obj.mobile if c.isdigit() or c == '+').lstrip('+')
        return format_html(
            '<div style="display: flex; gap: 6px;">'
            '<a href="https://wa.me/{0}" target="_blank" class="button" style="padding: 4px 8px; font-size: 0.72rem; background: #25d366 !important; box-shadow: none !important;">WhatsApp</a>'
            '<a href="mailto:{1}" class="button" style="padding: 4px 8px; font-size: 0.72rem; background: #0284c7 !important; box-shadow: none !important;">Email</a>'
            '</div>',
            clean_num, obj.email
        )

    @admin.display(description="Direct Outreach Channels")
    def direct_outreach_panel(self, obj):
        clean_num = ''.join(c for c in obj.mobile if c.isdigit() or c == '+').lstrip('+')
        return format_html(
            '<div style="display: flex; gap: 12px; margin-top: 8px; flex-wrap: wrap;">'
            '<a href="https://wa.me/{0}?text=Hi%20{1},%20thanks%20for%20checking%20out%20my%20portfolio!" target="_blank" class="button default" style="padding: 8px 16px; font-size: 0.85rem;">💬 Open WhatsApp Conversation</a>'
            '<a href="mailto:{2}?subject=Hello%20from%20Vyza%20Reddy" class="button" style="padding: 8px 16px; font-size: 0.85rem;">✉️ Send Direct Email</a>'
            '<a href="tel:{3}" class="button" style="padding: 8px 16px; font-size: 0.85rem; background: #475569 !important;">📞 Call {3}</a>'
            '</div>',
            clean_num, obj.full_name, obj.email, obj.mobile
        )
