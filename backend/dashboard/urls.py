from django.urls import path
from .views import (
    DashboardView,
    DocumentUploadView,
    CreatePaymentView,
    CreateCertifiateView,
    DownloadCertificateView
)


urlpatterns = [
    path('', DashboardView.as_view()),
    path('upload-document/', DocumentUploadView.as_view()),
    path('upload-receipt/', CreatePaymentView.as_view()),
    path('create-certificate/', CreateCertifiateView.as_view()),
    path('download-certificate/', DownloadCertificateView.as_view())
]