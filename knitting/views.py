from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from knitting import crease

def index(request):
    return HttpResponse("Hello, world. You're at the knitting index. {!s:}".format(crease.run_example()))