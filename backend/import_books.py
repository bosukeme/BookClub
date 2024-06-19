import json

import os
import django

os.environ['DJANGO_SETTINGS_MODULE'] = 'book_club.settings.local'
django.setup()

from books.models import Book

with open("books.json", mode="r", encoding="utf-8") as f:
    books_list = json.load(f)

for item in books_list:
    book, created = Book.objects.get_or_create(
        author = item["author"],
        title = item["title"],
        summary = item['summary'],
        link = item['link'],
        defaults={
            "year_published": item["year_published"],
            "description": item["genre"],
            "image_url": item["image_url"]
        }
    )
    if not created:
        print(f"Book with title '{item['title']}' already exists.")