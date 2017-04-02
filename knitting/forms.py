from django import forms
from  django.core.validators import MinValueValidator

class CreaseForm(forms.Form):
    N_from = forms.IntegerField(
        label='From',
        validators=[MinValueValidator(1)],
        widget=forms.NumberInput(attrs={'type':'range',
                                        'class':'knit-slider',
                                        'name': "from_range"}))
    N_to = forms.IntegerField(
        label='To',
        validators=[MinValueValidator(1)],
        widget=forms.NumberInput(attrs={'type':'range',
                                        'class':'knit-slider',
                                        'name': "to_range"}))
