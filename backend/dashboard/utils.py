import secrets
import string
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework import serializers


BASE_URL = "http:127.0.0.1:8000"
FROM_EMAIL = "nammesnigeria@gmail.com"


def generate_certificate_id(length=10):
    alphabet = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))


def validate_file(value):
    valid_types = ['application/pdf', 'image/jpeg', 'image/png']
    print(value.content_type)
    if value.content_type not in valid_types:
        raise serializers.ValidationError("Unsupported file type")
    if value.size > 5 * 1024 * 1024:  # 5MB limit
        raise serializers.ValidationError("File too large (max 5MB)")
    return value


def request_approval_notification(user, certificate):
    context = {
        'student_name': user.profile.full_name,
        'certificate_id': certificate.id,
        'issue_date': certificate.date_issued.strftime("%B %d, %Y"),
        'program_name': "NAMMES Nigeria Certificate of Membership",
        'download_link': f"{BASE_URL}/admin/dashboard/pendingcertificate/{certificate.id}/change/",
    }
    
    # Render HTML content
    text_content = render_to_string('certificate_request_approval_email.txt', context)
    html_content = render_to_string('certificate_request_approval_email.html', context)
    
    # Create email
    email = EmailMultiAlternatives(
        subject="Review Certificate Request!",
        body=text_content,
        from_email=FROM_EMAIL,
        to=[user.email]
    )
    email.attach_alternative(html_content, "text/html")
    email.send()


def send_approval_notification(user, certificate):
    context = {
        'student_name': user.profile.full_name,
        'certificate_id': certificate.id,
        'issue_date': certificate.date_issued.strftime("%B %d, %Y"),
        'program_name': "NAMMES Nigeria Certificate of Membership",
        'download_link': f"{BASE_URL}/dashboard/",
    }
    
    # Render HTML content
    text_content = render_to_string('certificate_approval_email.txt', context)
    html_content = render_to_string('certificate_approval_email.html', context)
    
    # Create email
    email = EmailMultiAlternatives(
        subject="Your Certificate Has Been Approved!",
        body=text_content,  # Create a text version too
        from_email=FROM_EMAIL,
        to=[user.email]
    )
    email.attach_alternative(html_content, "text/html")
    email.send()