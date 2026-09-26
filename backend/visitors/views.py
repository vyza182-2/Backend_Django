import os
import json
import logging
import urllib.request
import urllib.error
from pathlib import Path
from dotenv import load_dotenv
from rest_framework import generics
from .models import Visitor
from .serializers import VisitorSerializer

logger = logging.getLogger(__name__)


def send_telegram_notification(visitor):
    # Ensure latest .env values are loaded dynamically
    base_dir = Path(__file__).resolve().parent.parent
    load_dotenv(base_dir / '.env')
    load_dotenv(base_dir.parent / '.env')

    bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
    chat_id = os.getenv('TELEGRAM_CHAT_ID')

    if not bot_token or not chat_id:
        print(f"[TELEGRAM] Warning: Credentials missing (TOKEN: {bool(bot_token)}, CHAT_ID: {bool(chat_id)})")
        return

    text = (
        f"🚨 <b>New Portfolio Visitor!</b>\n\n"
        f"👤 <b>Name:</b> {visitor.full_name}\n"
        f"📱 <b>Mobile:</b> {visitor.mobile}\n"
        f"📧 <b>Email:</b> {visitor.email}\n"
        f"🕒 <b>Time:</b> {visitor.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}"
    )

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML"
    }).encode('utf-8')

    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            res_body = response.read().decode('utf-8')
            print(f"[TELEGRAM] Successfully sent notification for visitor #{visitor.id}: {res_body}")
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8') if e.fp else ''
        print(f"[TELEGRAM] HTTP Error {e.code}: {err_body}")
    except Exception as e:
        print(f"[TELEGRAM] Error sending notification: {e}")



class VisitorListCreateView(generics.ListCreateAPIView):
    """
    API endpoint to list visitors or submit a new visitor record.
    POST /api/visitors/ or /api/visitor/
    GET  /api/visitors/
    """
    queryset = Visitor.objects.all()
    serializer_class = VisitorSerializer

    def perform_create(self, serializer):
        visitor = serializer.save()
        send_telegram_notification(visitor)
