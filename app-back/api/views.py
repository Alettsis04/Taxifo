import json
import uuid
import jwt, datetime
import re

from django.http import JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .models import *
from werkzeug.security import generate_password_hash, check_password_hash


class LoginView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        try:
            jd = json.loads(request.body)
            usuario = Usuario.objects.get(correo=jd['correo'])
            if (usuario):
                if(check_password_hash(usuario.clave, jd['clave'])):
                    rol = str(Detalle_rol.objects.get(id_usuario=usuario))
                    datos = {'estado': True, 'mensaje': 'Correcto', 'nombre': usuario.id_persona.nombre, 'token': usuario.token, 'tipo': rol}
                else:
                    datos = {'estado': False, 'mensaje': 'Contraseña no válida'}
            else:
                datos = {'estado': False, 'mensaje': 'No hay existe el usuario'}
        except:
            datos = {'estado': False, 'mensaje': 'Error 0.0'}

        return JsonResponse(datos)


class AuditoriaView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        try:
            auditorias = list(Auditoria.objects.values())
            if (len(auditorias) > 0):
                datos = {'estado': True, 'mensaje': 'Correcto', 'auditorias': auditorias}
            else:
                datos = {'estado': False, 'mensaje': 'No hay auditorias...'}
        except:
            datos = {'estado': False, 'mensaje': 'Error 0.0'}

        return JsonResponse(datos)

    def post(self, request):
        try:
            jd = json.loads(request.body)
            payload = jwt.decode(jd['jwt'], 'secreto', algorithms=['HS256'])
            auditoria = Auditoria()
            auditoria.accion = payload['accion']
            auditoria.usuario = payload['usuario']
            auditoria.save()
            datos = {'estado': True, 'mensaje': 'Acción guarda'}
        except:
            datos = {'estado': False, 'mensaje': 'Error 0.0'}
        return JsonResponse(datos)


class UsuarioView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        try:
            usuarios = list(Usuario.objects.values())
            if (len(usuarios) > 0):
                datos = {'estado': True, 'mensaje': 'Correcto', 'usuarios': usuarios}
            else:
                datos = {'estado': False, 'mensaje': 'No hay usuarios...'}
        except:
            datos = {'estado': False, 'mensaje': 'Error 0.0'}

        payload = {
            'correo': "aaaa",
        }

        token = jwt.encode(payload, 'secreto', algorithm='HS256')

        return JsonResponse({'jwt': token})

    def post(self, request):
        try:
            jd = json.loads(request.body)
            if (es_correo_valido(jd['correo'])):
                usuarioUnico = Usuario.objects.filter(correo=jd['correo'])
                if (len(usuarioUnico) == 0):
                    if (es_integer(jd['cedula']) and len(jd['cedula']) == 10 and es_integer(
                            jd['telefono']) and len(jd['telefono']) == 10):
                        personaUnica = Persona.objects.filter(cedula=jd['cedula'])
                        if (len(personaUnica) == 0):
                            datos = {'estado': True, 'mensaje': 'Correcto'}

                            rol = Rol.objects.get(tipo=jd['rol'])

                            persona = Persona()
                            persona.nombre = jd['nombre']
                            persona.apellido = jd['apellido']
                            persona.telefono = jd['telefono']
                            persona.cedula = jd['cedula']
                            persona.save()

                            usuario = Usuario()
                            usuario.correo = jd['correo']
                            usuario.clave = generate_password_hash(jd['clave'])
                            usuario.token = generate_token()
                            usuario.id_persona = persona
                            if (jd['rol'] == 'Cliente'):
                                usuario.activo = False
                            else:
                                usuario.activo = True
                            usuario.save()

                            detRol = Detalle_rol()
                            detRol.id_rol = rol
                            detRol.id_usuario = usuario
                            detRol.save()

                        else:
                            datos = {'estado': False, 'mensaje': 'Persona ya Existe'}
                    else:
                        datos = {'estado': False, 'mensaje': 'Cédula o Teléfono no válidos'}
                else:
                    datos = {'estado': False, 'mensaje': 'Correo Ya Existe'}

            else:
                datos = {'estado': False, 'mensaje': 'Correo no válido'}

        except:
            datos = {'estado': False, 'mensaje': 'Error 0.0'}
        return JsonResponse(datos)

        # Falta por terminar

        def put(self, request):
            try:
                jd = json.loads(request.body)
                barrios = list(Barrio.objects.filter(nombre=jd['nombre']))
                if (len(barrios) > 0):
                    barrio = Barrio.objects.get(nombre=jd['nombre'])
                    barrio.nombre = jd['newNombre']
                    barrio.save()
                    datos = {'estado': True, 'mensaje': 'Correcto'}
                else:
                    datos = {'estado': False, 'mensaje': 'Barrio No Encontrado'}
            except:
                datos = {'estado': False, 'mensaje': 'Error 0.0'}

            return JsonResponse(datos)

        def delete(self, request):
            try:
                jd = json.loads(request.body)
                barrios = list(Barrio.objects.filter(nombre=jd['nombre']))
                if (len(barrios) > 0):
                    barrio = Barrio.objects.get(nombre=jd['nombre'])
                    barrio.delete()
                    datos = {'estado': True, 'mensaje': 'Correcto'}
                else:
                    datos = {'estado': False, 'mensaje': 'Barrio No Encontrado'}
            except:
                datos = {'estado': False, 'mensaje': 'Error 0.0'}
            return JsonResponse(datos)


class BarrioView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        try:
            barrios = list(Barrio.objects.values())
            if (len(barrios) > 0):
                datos = {'mensaje': 'Correcto', 'barrios': barrios}
            else:
                datos = {'mensaje': 'No hay barrios...'}
        except:
            datos = {'mensaje': 'No hay barrios...'}
        return JsonResponse(datos, safe=False)

    def post(self, request):
        try:
            jd = json.loads(request.body)
            barrioUnico = Barrio.objects.filter(nombre=jd['nombre'])
            if (len(barrioUnico) == 0):
                datos = {'estado': True, 'mensaje': 'Correcto'}
                Barrio.objects.create(nombre=jd['nombre'])
            else:
                datos = {'estado': False, 'mensaje': 'Barrio Ya Existe'}
        except:
            datos = {'estado': False, 'mensaje': 'Error 0.0'}
        return JsonResponse(datos)

        def put(self, request):
            try:
                jd = json.loads(request.body)
                barrios = list(Barrio.objects.filter(nombre=jd['nombre']))
                if (len(barrios) > 0):
                    barrio = Barrio.objects.get(nombre=jd['nombre'])
                    barrio.nombre = jd['newNombre']
                    barrio.save()
                    datos = {'estado': True, 'mensaje': 'Correcto'}
                else:
                    datos = {'estado': False, 'mensaje': 'Barrio No Encontrado'}
            except:
                datos = {'estado': False, 'mensaje': 'Error 0.0'}

            return JsonResponse(datos)

        def delete(self, request):
            try:
                jd = json.loads(request.body)
                barrios = list(Barrio.objects.filter(nombre=jd['nombre']))
                if (len(barrios) > 0):
                    barrio = Barrio.objects.get(nombre=jd['nombre'])
                    barrio.delete()
                    datos = {'estado': True, 'mensaje': 'Correcto'}
                else:
                    datos = {'estado': False, 'mensaje': 'Barrio No Encontrado'}
            except:
                datos = {'estado': False, 'mensaje': 'Error 0.0'}
            return JsonResponse(datos)


def generate_token():
    """Genera un token unico de 32 caracteres."""
    return str(uuid.uuid4()).replace('-', '')


def es_correo_valido(correo):
    expresion_regular = r"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"
    return re.match(expresion_regular, correo) is not None


def es_integer(string):
    reg_exp = "[-+]?\d+$"
    return re.match(reg_exp, string) is not None
