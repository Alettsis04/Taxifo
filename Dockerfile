FROM python:3.9.13-alpine3.16

ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apk update \
    && apk add --no-cache gcc musl-dev postgresql-dev python3-dev libffi-dev \
    && pip install --upgrade pip

COPY ./requerimientos.txt ./

RUN pip install -r requerimientos.txt

COPY ./ ./

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
