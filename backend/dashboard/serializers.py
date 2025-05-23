from rest_framework import serializers
from .models import Document, Certificate, Payment
from .utils import validate_file


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['file']

    def validate_file(self, value):
        return validate_file(value)
    

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['receipt']

    def validate_receipt(self, value):
        return validate_file(value)


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = []
