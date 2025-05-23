from django.urls import path
from .views import DashboardView, DocumentUploadView, CreatePaymentView, CreateCertifiateView


urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('upload-document/', DocumentUploadView.as_view(), name='upload-document'),
    path('upload-receipt/', CreatePaymentView.as_view(), name='pay'),
    path('create-certificate/', CreateCertifiateView.as_view(), name='create-certificate')
]