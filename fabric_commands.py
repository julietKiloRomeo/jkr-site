# Fabfile to:
#    - update the remote system(s) 
#    - download and install an application

# Import Fabric's API module
from fabric.api import run, sudo, put, env, cd, prefix
from fabric.operations import put
from contextlib import contextmanager as _contextmanager

base_folder = '/home/jkr'
env_name    = 'django_env'
proj_name   = 'julietKiloRomeo'
project_folder = base_folder + '/' + proj_name
env_folder = base_folder + '/' + env_name


env.hosts = [
    'jkr_server',
]
env.host = 'jkr_server'
# Set the username
env.user   = "jkr"

env.directory = env_folder
env.activate = 'source {}/bin/activate'.format(env_folder)

@_contextmanager
def virtualenv():
    with prefix(env.activate):
        yield





def update_upgrade():
    """
        Update the default OS installation's
        basic default tools.
                                            """
    # tested
    sudo("apt update")
    sudo("apt upgrade -y")

def apt():
    # tested
    packages = ['python3-pip',
                'python3-dev',
                'python-dev',
                'libpq-dev',
                'postgresql',
                'postgresql-contrib',
                'nginx']
    sudo("apt install -y "+' '.join(packages))
    sudo("ufw allow 'Nginx Full'")


def files():
    run('rm -Rf {}'.format(env_folder))
    run('rm -Rf {}'.format(project_folder))
    run('mkdir {}'.format(env_folder))
    run('mkdir {}'.format(project_folder))

    with cd(base_folder):
        run('virtualenv {}'.format(env_name))

    put('/home/jkr/julietKiloRomeo/*', '{}'.format(project_folder))

def pip():
    # must come after files()!
    # tested
    # sudo('pip3 install --no-cache-dir --upgrade pip', user='jkr', group='jkr')
    # sudo('pip3 install --no-cache-dir virtualenv', user='jkr', group='jkr')
    with cd(project_folder),\
         virtualenv():
        run('pip install --no-cache-dir -r requirements.txt')

def nginx():
    sudo('cp {}/nginx.template /etc/nginx/sites-available/julietKiloRomeo'.format(project_folder))
    try:
        sudo('unlink /etc/nginx/sites-enabled/julietKiloRomeo')
    except:
        print('No link in sites-enabled')
    sudo('ln -s /etc/nginx/sites-available/julietKiloRomeo /etc/nginx/sites-enabled')
    sudo('systemctl daemon-reload')
    sudo('systemctl restart nginx')


def gunicorn():
    sudo('cp {}/gunicorn.service.template /etc/systemd/system/jkr_gunicorn.service'.format(project_folder))
    sudo('systemctl daemon-reload')
    sudo('systemctl start jkr_gunicorn')
    sudo('systemctl enable jkr_gunicorn')

def test_gunicorn():
    output = run('curl http://127.0.0.1:8000/knitting'.format(project_folder))
    assert "<span id='jres2' name='jres2' class='label'>" in output

def update_install():

    # Update
    update_upgrade()
    # Install
    apt()

def deploy():
    # update_install()
    files()
    pip()
    nginx()
    gunicorn()
    test_gunicorn()

if __name__ == '__main__':
    deploy()