from django.db import models
from datetime import datetime

class Barrio(models.Model):
    nombre = models.CharField(max_length=150, null=False)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Barrio'
        verbose_name_plural = 'Barrios'
        ordering = ['id']


class Rol(models.Model):
    tipo = models.CharField(max_length=15, null=False)

    def __str__(self):
        return self.tipo

    class Meta:
        verbose_name = 'Rol'
        verbose_name_plural = 'Roles'
        ordering = ['id']


class Persona(models.Model):
    nombre = models.CharField(max_length=100, null=False)
    apellido = models.CharField(max_length=100, null=False)
    cedula = models.CharField(max_length=10, null=False)
    telefono = models.CharField(max_length=10, null=False)

    def __str__(self):
        return self.nombre + " " + self.apellido

    class Meta:
        verbose_name = 'Persona'
        verbose_name_plural = 'Personas'
        ordering = ['id']


class Usuario(models.Model):
    token = models.CharField(max_length=150, null=False)
    correo = models.CharField(max_length=50, null=False)
    clave = models.CharField(max_length=150, null=False)
    activo = models.BooleanField(default=False)
    id_persona = models.ForeignKey(Persona, on_delete=models.CASCADE)

    def __str__(self):
        return self.id_persona.nombre + " " + self.id_persona.apellido + " " + self.correo

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['id']


class Detalle_rol(models.Model):
    id_rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.id_rol.tipo

    class Meta:
        verbose_name = 'Detalle_rol'
        verbose_name_plural = 'Detalle_roles'
        ordering = ['id']


class Direccion(models.Model):
    nombre = models.CharField(max_length=100, null=False)
    calle1 = models.CharField(max_length=150, null=False)
    calle2 = models.CharField(max_length=150, null=False)
    referencia = models.CharField(max_length=200, null=False)
    id_barrio = models.ForeignKey(Barrio, on_delete=models.CASCADE)
    id_persona = models.ForeignKey(Persona, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Direccion'
        verbose_name_plural = 'Direcciones'
        ordering = ['id']

class Auditoria(models.Model):
    accion = models.CharField(max_length=100, null=False)
    usuario = models.CharField(max_length=150, null=False)
    date = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.accion + " - " + self.usuario + " - " + self.date

    class Meta:
        verbose_name = 'Auditoria'
        verbose_name_plural = 'Auditorias'
        ordering = ['id']