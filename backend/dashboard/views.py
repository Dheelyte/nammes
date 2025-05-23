from rest_framework import generics, permissions, status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from user.models import Profile
from user.serializers import UserSerializer
from .models import Document, Payment, Certificate
from .serializers import DocumentSerializer, PaymentSerializer, CertificateSerializer


class DocumentUploadView(generics.CreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if hasattr(self.request.user, 'document'):
            raise serializers.ValidationError("Document already exists")
        serializer.save(user=self.request.user)


class CreatePaymentView(generics.CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def perform_create(self, serializer):
    #     if hasattr(self.request.user, 'payment'):
    #         raise serializers.ValidationError("Payment already exists")
    #     serializer.save(user=self.request.user)


class CreateCertifiateView(generics.CreateAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if hasattr(self.request.user, 'certificate'):
            raise serializers.ValidationError("Certificate already exists")
        serializer.save(user=self.request.user)


class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(UserSerializer(user).data)