# julietKiloRomeo

This is a small Django website for my own personal use. I will use it to test ideas about data-processing and visualization and to serve small applications.

## Getting Started

If you want to test it out you should be able to just clone the repo and serve the site with the Django test-server.

### Prerequisites

The site currently depends on:
 - django
 - fabric

### Installing

```
git clone https://github.com/julietKiloRomeo/julietKiloRomeo.git
virtualenv django_env
source django_env/bin/activate
cd julietKiloRomeo
pip install -r requirements.txt
python manage.py runserver

```

## Running the tests

There are no tests yet...

## Deployment

This is what the fabric dependency is for

```
(django_env) > python fab.py
```
The script will deploy to my Digital Ocean server though so you would need to make some changes. 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
