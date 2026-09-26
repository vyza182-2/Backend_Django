from django.urls import path
from .views import VisitorListCreateView

urlpatterns = [
    path('visitors/', VisitorListCreateView.as_view(), name='visitor-list-create'),
    path('visitors', VisitorListCreateView.as_view(), name='visitor-list-create-noslash'),
    path('visitor/', VisitorListCreateView.as_view(), name='visitor-create'),
    path('visitor', VisitorListCreateView.as_view(), name='visitor-create-noslash'),
]
