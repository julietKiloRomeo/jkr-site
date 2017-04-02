import json

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


from knitting import crease
from .forms import CreaseForm

def index(request):
    sol = ''
    form = CreaseForm()
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = CreaseForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            N_to   = int(request.POST.get("N_to"))
            N_from = int(request.POST.get("N_from"))
            sol = crease.crease(N_from, N_to)

            

    # if a GET (or any other method) we'll create a blank form

    return render(request, 'crease.html', {'form': form,
                                           'sol':sol})
    