from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.http import HttpResponse

urlpatterns = [
    path('', lambda request: HttpResponse("It works!")),
    path('admin/', admin.site.urls),
    path('api/user/', include('user.urls')),
    path('api/dashboard/', include('dashboard.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
