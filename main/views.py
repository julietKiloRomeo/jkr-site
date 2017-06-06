from main.models import Post
from django.shortcuts import render
from django.template import Context, Template


def index(request):
    return render(request, 'index.html')


def post_list(request):
    return render(request, 'index.html')


def post_detail(request, slug=None):
    post = Post.objects                \
               .filter(is_demo = False) \
               .filter(slug = slug)    \
               .first()
    return render(request, 'post.html', {'js'  : post.javascript,
                                                 'body': post.body} )


def demo_detail(request, slug=None):
    post = Post.objects                \
               .filter(is_demo = True) \
               .filter(slug = slug)    \
               .first()
    return render(request, 'demo.html', {'js'  : post.javascript,
                                                 'body': post.body} )
