FROM python:3.10.14-slim-bullseye

RUN pip install --upgrade pip

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . /app

WORKDIR /app

COPY ./entrypoint.sh .

ENV DJANGO_SETTINGS_MODULE=book_club.settings.local

ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]