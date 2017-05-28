from main.models import Post
from django.shortcuts import render

from django.template import Context, Template

def index(request):
    return render(request, 'index.html')

def post_list(request):
    return render(request, 'index.html')

from django.http import HttpResponse

def post_detail(request, slug):
    post = Post.objects.filter(slug = slug).first()
    return render(request, 'post.html', context={'js': post.javascript,
                                                 'body':post.body } )
