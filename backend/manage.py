#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from book_club.settings.base import DEBUG
from dotenv import load_dotenv

load_dotenv()

def main():
    """Run administrative tasks."""
    if DEBUG:    
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "book_club.settings.local")
    else:
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "book_club.settings.development")
        
    if 'generate_schema' in sys.argv:
        os.system("python manage.py spectacular --file schema.yaml")
        sys.argv.remove('generate_schema')
    
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
