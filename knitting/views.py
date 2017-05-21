import json

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


from knitting import crease
from .forms import CreaseForm

def index(request):
    return render(request, 'knitting.html')
    