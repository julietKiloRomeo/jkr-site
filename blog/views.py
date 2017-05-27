from django.shortcuts import render

from main.models import Post

def index(request):
    posts = Post.objects.all()
    return render(request, 'blog.html', {'posts':posts })

def post_detail(request):
    posts = Post.objects.all()
    return render(request, 'blog.html', {'posts':posts })