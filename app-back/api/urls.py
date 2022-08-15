from django.urls import path
from .views import *

urlpatterns=[
    path('barrios/', BarrioView.as_view(), name='barrios'),
    path('usuarios/', UsuarioView.as_view(), name='usuarios'),
    path('autidoria/', AuditoriaView.as_view(), name='auditoria'),
    path('login/', LoginView.as_view(), name='login')
]