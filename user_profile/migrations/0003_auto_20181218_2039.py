# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2018-12-18 20:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0002_auto_20181218_2037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_chat_session',
            name='status',
            field=models.CharField(choices=[('0', 'no_action'), ('1', 'requested_by'), ('2', 'accepted_by'), ('3', 'declined_by'), ('4', 'blocked_by')], default='0', max_length=1),
        ),
    ]
