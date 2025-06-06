from django.db import models
from django.conf import settings
from .utils import generate_certificate_id


class Document(models.Model):
    file = models.FileField(upload_to='documents')
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class Certificate(models.Model):
    id = models.CharField(
        max_length=10,
        primary_key=True,
        default=generate_certificate_id,
        editable=False,
        unique=True,
        db_index=True
    )
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_issued = models.DateField(auto_now_add=True)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f"Certificate ({self.id})"


class PendingCertificate(Certificate):
    class Meta:
        proxy = True
        verbose_name = "Pending Certificate"
        verbose_name_plural = "Pending Certificates"

class ApprovedCertificate(Certificate):
    class Meta:
        proxy = True
        verbose_name = "Approved Certificate"
        verbose_name_plural = "Approved Certificates"


class Payment(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    receipt = models.FileField(upload_to='documents')
    date = models.DateTimeField(auto_now_add=True)