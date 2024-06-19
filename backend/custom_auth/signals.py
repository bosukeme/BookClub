# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from rest_framework.authtoken.models import Token

# from .models import CustomUser

# @receiver(post_save, sender=CustomUser, weak=False)
# def report_saved(sender, instance, created, **kwargs):
#     if created:
#         Token.objects.create(user=instance)