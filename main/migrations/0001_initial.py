# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-22 18:50
from __future__ import unicode_literals

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='title')),
                ('slug', models.SlugField(unique=True, verbose_name='slug')),
            ],
            options={
                'ordering': ('title',),
                'db_table': 'blog_categories',
                'verbose_name': 'category',
                'verbose_name_plural': 'categories',
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='title')),
                ('slug', models.SlugField(unique_for_date='publish', verbose_name='slug')),
                ('body', models.TextField(verbose_name='body')),
                ('tease', models.TextField(blank=True, help_text='Concise text suggested. Does not appear in RSS feed.', verbose_name='tease')),
                ('status', models.IntegerField(choices=[(1, 'Draft'), (2, 'Public')], default=2, verbose_name='status')),
                ('allow_comments', models.BooleanField(default=True, verbose_name='allow comments')),
                ('publish', models.DateTimeField(default=datetime.datetime.now, verbose_name='publish')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', models.DateTimeField(auto_now=True, verbose_name='modified')),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('categories', models.ManyToManyField(blank=True, to='main.Category')),
            ],
            options={
                'ordering': ('-publish',),
                'get_latest_by': 'publish',
                'verbose_name_plural': 'posts',
                'db_table': 'blog_posts',
                'verbose_name': 'post',
            },
        ),
    ]
