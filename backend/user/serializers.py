from django.contrib.auth import authenticate

from rest_framework import serializers

from .models import CustomUser, Profile


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    full_name = serializers.CharField()
    school = serializers.CharField()
    matric_number = serializers.IntegerField()

    class Meta:
        model = CustomUser
        fields = [
            'email',
            'full_name',
            'school',
            'matric_number',
            'password',
        ]

    def create(self, validated_data):
        profile_data = {
            'full_name': validated_data.pop('full_name'),
            'school': validated_data.pop('school'),
            'matric_number': validated_data.pop('matric_number')
        }
        user = CustomUser.objects.create_user(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(request=self.context.get('request'), email=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid email or password.")
        
        attrs['user'] = user
        return attrs


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('full_name', 'matric_number', 'school')

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    receipt_uploaded = serializers.SerializerMethodField()
    document_uploaded = serializers.SerializerMethodField()
    certificate_status = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = (
            'email',
            'profile',
            'receipt_uploaded',
            'document_uploaded',
        )

    def receipt_uploaded(self, obj):
        return hasattr(obj, 'payment')
    
    def document_uploaded(self, obj):
        return hasattr(obj, 'document') 
    
    def certificate_status(self, obj):
        if hasattr(obj, 'certificate'):
            return 'approved' if self.user.certificate.approved else 'pending'
        return 'none'