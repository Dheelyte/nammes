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
        ]

    def create(self, validated_date):
        profile_data = {
            'full_name': validated_date.pop('full_name'),
            'school': validated_date.pop('school'),
            'matric_number': validated_date.pop('matric_number')
        }
        user = CustomUser.objects.create_user(**validated_date)
        Profile.objects.filter(user=user).update(**profile_data)