from flask import Flask
from dotenv import find_dotenv, load_dotenv
import os

env_file = find_dotenv()
if env_file:
    load_dotenv(env_file)


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY=os.getenv('SECRET_KEY'),
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite')
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/health')
    def _health_check():
        return {
            "status": "ok"
        }

    return app
