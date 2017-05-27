
from django.db import models
from django.db.models import permalink
from django.contrib.auth.models import User
from django.conf import settings
from django.urls import reverse

import datetime


class Category(models.Model):
    """Category model."""
    title = models.CharField( 'title', max_length=100)
    slug = models.SlugField( 'slug', unique=True)

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'
        db_table = 'blog_categories'
        ordering = ('title',)

    def __unicode__(self):
        return u'%s' % self.title

    def __str__(self):
        return u'%s' % self.title

    def __repr__(self):
        return u'%s' % self.title

    @permalink
    def get_absolute_url(self):
        return ('blog_category_detail', None, {'slug': self.slug})


class Post(models.Model):
    """Post model."""
    STATUS_CHOICES = (
        (1, 'Draft'),
        (2, 'Public'),
    )
    title = models.CharField('title', max_length=200)
    slug = models.SlugField('slug', unique_for_date='publish')
    author = models.ForeignKey(User, blank=True, null=True)
    body = models.TextField('body', )
    tease = models.TextField('tease', blank=True, help_text='Concise text suggested. Does not appear in RSS feed.')
    status = models.IntegerField('status', choices=STATUS_CHOICES, default=2)
    allow_comments = models.BooleanField('allow comments', default=True)
    publish = models.DateTimeField('publish', default=datetime.datetime.now)
    created = models.DateTimeField('created', auto_now_add=True)
    modified = models.DateTimeField('modified', auto_now=True)
    categories = models.ManyToManyField(Category, blank=True)

    class Meta:
        verbose_name = 'post'
        verbose_name_plural = 'posts'
        db_table = 'blog_posts'
        ordering = ('-publish',)
        get_latest_by = 'publish'

    def __unicode__(self):
        return u'%s' % self.title

    @permalink
    def get_absolute_url(self):
        return reverse('blog.views.post_detail', args=[str(self.slug)])        

    def get_previous_post(self):
        return self.get_previous_by_publish(status__gte=2)

    def get_next_post(self):
        return self.get_next_by_publish(status__gte=2)
