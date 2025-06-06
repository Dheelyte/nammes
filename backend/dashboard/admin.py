# from django.contrib import admin
# from django.utils.html import format_html
# from import_export.admin import ImportExportModelAdmin
# from .models import Certificate, Document, Payment
from .utils import send_approval_notification


# admin.site.site_header = "NAMMES Admin Portal"
# admin.site.site_title = "NAMMES Admin Portal"
# admin.site.index_title = "Certification Portal "

# admin.py
from django.contrib import admin
from django.utils.html import format_html
from import_export.admin import ImportExportModelAdmin
from .models import PendingCertificate, ApprovedCertificate, Document, Payment

class BaseCertificateAdmin(ImportExportModelAdmin):
    # Shared list configuration
    list_display = (
        'get_full_name', 
        'user', 
        'get_school',
        'date_issued',
        'approval_status'
    )
    search_fields = ('user__email', 'id')
    date_hierarchy = 'date_issued'

    # Shared form configuration
    fieldsets = (
        (None, {
            'fields': ('user', 'date_issued',)
        }),
        ('Student Profile', {
            'fields': (
                'get_full_name',
                'get_school',
                'get_matric_number',
            ),
            'description': "User details (read-only)"
        }),
        ('Verification Documents', {
            'fields': (
                'get_document_file',
                'get_payment_receipt',
            ),
        }),
    )

    # Shared read-only fields
    base_readonly_fields = (
        'user', 
        'date_issued',
        'get_full_name',
        'get_school',
        'get_matric_number',
        'get_document_file',
        'get_payment_receipt',
        'approval_status'
    )

    # Shared methods
    def get_full_name(self, obj):
        return obj.user.profile.full_name if hasattr(obj.user, 'profile') else "N/A"
    get_full_name.short_description = "Full Name"

    def get_school(self, obj):
        return obj.user.profile.school if hasattr(obj.user, 'profile') else "N/A"
    get_school.short_description = "School"

    def get_matric_number(self, obj):
        return obj.user.profile.matric_number if hasattr(obj.user, 'profile') else "N/A"
    get_matric_number.short_description = "Matric Number"

    def get_document_file(self, obj):
        document = Document.objects.filter(user=obj.user).first()
        return format_html(
            '<a href="{0}" target="_blank">{1}</a>',
            document.file.url,
            "View Document" if document and document.file else "No document"
        )
    get_document_file.short_description = "Verification Document"

    def get_payment_receipt(self, obj):
        payment = Payment.objects.filter(user=obj.user).first()
        return format_html(
            '<a href="{0}" target="_blank">{1}</a>',
            payment.receipt.url if payment and payment.receipt else '#',
            "View Receipt" if payment and payment.receipt else "No receipt"
        )
    get_payment_receipt.short_description = "Payment Receipt"

    def approval_status(self, obj):
        return "✅ Approved" if obj.approved else "⏳ Pending"
    approval_status.short_description = "Status"

    def has_add_permission(self, request):
        return False

@admin.register(PendingCertificate)
class PendingCertificateAdmin(BaseCertificateAdmin):
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user').filter(approved=False)

    # Customize for pending certificates
    readonly_fields = BaseCertificateAdmin.base_readonly_fields
    actions = ['approve_selected']
    list_filter = ('date_issued',)

    fieldsets = BaseCertificateAdmin.fieldsets + (
        ('Approval Actions', {
            'fields': ('approved',),
            'description': "Review documents before approval"
        }),
    )

    def approve_selected(self, request, queryset):
        updated = queryset.update(approved=True)
        for cert in queryset:
            send_approval_notification(cert.user, cert)
        self.message_user(request, f"{updated} certificate(s) approved")
    approve_selected.short_description = "Approve selected certificates"

    def save_model(self, request, obj, form, change):
        if 'approved' in form.changed_data and obj.approved:
            send_approval_notification(obj.user, obj)
        super().save_model(request, obj, form, change)

@admin.register(ApprovedCertificate)
class ApprovedCertificateAdmin(BaseCertificateAdmin):
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user').filter(approved=True)

    # Customize for approved certificates
    readonly_fields = BaseCertificateAdmin.base_readonly_fields
    list_filter = ('date_issued', 'user__profile__school')
    
    fieldsets = (
        (None, {
            'fields': ('user', 'date_issued')
        }),
        ('Student Profile', {
            'fields': (
                'get_full_name',
                'get_school',
                'get_matric_number',
            )
        }),
        ('Verification Documents', {
            'fields': (
                'get_document_file',
                'get_payment_receipt',
            )
        }),
        ('Approval Status', {
            'fields': ('approved',),
        }),
    )

    def has_delete_permission(self, request, obj=None):
        return False


# class PendingCertificate(Certificate):
#     class Meta:
#         proxy = True  # Reuses the original Certificate table
#         verbose_name = "Pending Certificate"

# class ApprovedCertificate(Certificate):
#     class Meta:
#         proxy = True  # Reuses the original Certificate table
#         verbose_name = "Approved Certificate"


# @admin.register(PendingCertificate)
# class PendingCertificateAdmin(ImportExportModelAdmin):
#     # Show only unapproved certificates
#     def get_queryset(self, request):
#         return super().get_queryset(request).select_related('user').filter(approved=False)

#     # Customize list display
#     list_display = (
#         'get_full_name', 
#         'user', 
#         'get_school',
#         'date_issued',
#     )

#     search_fields = ('user__email', 'id')  # Search by user email or certificate ID
    
#     # Disable adding new entries (optional)
#     def has_add_permission(self, request):
#         return False
    
#     # Make all fields except 'approved' read-only
#     readonly_fields = (
#         'user', 
#         'date_issued',
#         'get_full_name',
#         'get_school',
#         'get_matric_number',
#         'get_document_file',
#         'get_payment_receipt',
#     )

#     # Define the order/grouping of fields
#     fieldsets = (
#         (None, {
#             'fields': ('user', 'date_issued',)
#         }),
#         ('Student Profile', {
#             'fields': (
#                 'get_full_name',
#                 'get_school',
#                 'get_matric_number',
#             ),
#             'description': "User details (read-only)"
#         }),
#         ('Verification Document', {
#             'fields': ('get_document_file',),
#         }),
#         ('Payment Receipt', {
#             'fields': ('get_payment_receipt',),
#         }),
#         ('Approve Certificate', {
#             'fields': ('approved',),
#         }),
#     )

#     # --- Profile Display Methods ---
#     def get_full_name(self, obj):
#         return obj.user.profile.full_name if hasattr(obj.user, 'profile') else "N/A"
#     get_full_name.short_description = "Full Name"

#     def get_school(self, obj):
#         return obj.user.profile.school if hasattr(obj.user, 'profile') else "N/A"
#     get_school.short_description = "School"

#     def get_matric_number(self, obj):
#         return obj.user.profile.matric_number if hasattr(obj.user, 'profile') else "N/A"
#     get_matric_number.short_description = "Matric Number"

#     # --- Document/Payment Display Methods ---
#     def get_document_file(self, obj):
#         document = Document.objects.filter(user=obj.user).first()
#         if document and document.file:
#             return format_html(
#                 '<a href="{0}" target="_blank">View Verification Document</a>',
#                 document.file.url,
#                 document.file.name
#             )
#         return "No document uploaded"
#     get_document_file.short_description = "Verification Document"

#     def get_payment_receipt(self, obj):
#         payment = Payment.objects.filter(user=obj.user).first()
#         if payment and payment.receipt:
#             return format_html(
#                 '<a href="{0}" target="_blank">View Payment Receipt</a>',
#                 payment.receipt.url,
#                 payment.receipt.name
#             )
#         return "No payment receipt uploaded"
#     get_payment_receipt.short_description = "Payment Receipt"

#     # Disable adding new Certificates (optional)
#     def has_add_permission(self, request):
#         return False  # Remove this if you want to allow additions

#     def save_model(self, request, obj, form, change):
#         # Check if approval status changed to True
#         print('Semd email')
#         if 'approved' in form.changed_data and obj.approved:
#             send_approval_notification(obj.user, obj)
#             print('Semd email confirmed')
        
#         super().save_model(request, obj, form, change)

# @admin.register(ApprovedCertificate)
# class ApprovedCertificateAdmin(PendingCertificateAdmin):
#     def get_queryset(self, request):
#         return super().get_queryset(request).select_related('user').filter(approved=True)
