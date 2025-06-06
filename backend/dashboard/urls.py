from django.urls import path
from .views import (
    DashboardView,
    DocumentUploadView,
    CreatePaymentView,
    CreateCertifiateView,
    GetCertificateView,
    VerifyCertificateView
)


urlpatterns = [
    path('', DashboardView.as_view()),
    path('upload-document/', DocumentUploadView.as_view()),
    path('upload-receipt/', CreatePaymentView.as_view()),
    path('create-certificate/', CreateCertifiateView.as_view()),
    path('get-certificate/', GetCertificateView.as_view()),
    path('verify-certificate/<certificate_id>/', VerifyCertificateView.as_view())
]