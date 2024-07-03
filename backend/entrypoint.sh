#!/bin/sh

python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --no-input

python import_books.py

gunicorn book_club.wsgi:application --bind 0.0.0.0:8000