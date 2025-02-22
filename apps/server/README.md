# `@envyper/server`

# Overview

This is the Envyper backend implmentaion

# Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation and Running the Dev Server](#installation-and-running-the-dev-server)
- [API Reference](#api-reference)
- [Configuration](https://www.notion.so/envyper-server-README-md-161f9fd35f32806db94be53e7713fe63?pvs=21)
- [Testing](https://www.notion.so/envyper-server-README-md-161f9fd35f32806db94be53e7713fe63?pvs=21)

# Getting Started

## Prerequisites

- Python 3.9+

## Installation

> The docs here assume you have cloned the repo, activated a virtual environment and your current working directory (CWD) is in the apps/server as directed in the Main README

```bash
# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env

# Run migrations
python manage.py migrate

# Start the server
python manage.py runserver

```

# API Reference

> The base API URL is the origin on which the API will be running. In development, this value will be `http://localhost:<port>` with the `<port>` being any arbitrary port number that you choose to run Django from.

## Users

### POST `/auth/user/create/`

Create a user.

| **Status** | **Description**                                  |
| ---------- | ------------------------------------------------ |
| 201        | Successful creation of a user                    |
| 400        | The user data passed with the request is invalid |

### POST `/auth/user/token/`

> This is a reimplementation of the Refresh endpoint that is built into [Django REST Framework SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html)

Authenticate an existing user.

### POST `/auth/user/token/refresh/`

> This is a reimplementation of the Refresh endpoint that is built into [Django REST Framework SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html)

Refresh the currnetly logged in user’s access token

### GET `/auth/user/me/`

> Other error quotes will pop up if other bad scenarios encountered. You can find all the docs for this implementations authentication in the [Django REST Framework SimpleJWT Docs](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html)

Access the currently logged in user’s data.

| **Status** | **Description**                      |
| ---------- | ------------------------------------ |
| 200        | Returns the currently logged in user |
| 404        | The user does not exist              |
| 401        | This current users is unauthorized   |

### PATCH `/auth/user/me/`

Update the logged in user’s data

| **Status** | **Description**               |
| ---------- | ----------------------------- |
| 200        | Success                       |
| 400        | Provided user data is invalid |
| 401        | The user is unauthorized      |

### DELETE `/auth/user/me/`

Delete the logged in user’s data

| **Status** | **Description**               |
| ---------- | ----------------------------- |
| 200        | Success                       |
| 400        | Provided user data is invalid |
| 401        | The user is unauthorized      |

## Projects

> Across all endpoints, if the user is not authenticated a `401 HTTP Response` with the received.

### POST `/projects/`

Create a new project to be owned by the current user.

| **Status** | **Description**                  |
| ---------- | -------------------------------- |
| 201        | Success                          |
| 400        | Provided project data is invalid |

### GET `/projects/`

Get all projects owned by the current user

| **Status** | **Description** |
| ---------- | --------------- |
| 200        | Success         |

### GET `/projects/{project_id}/`

Get a project with the provided project ID

| **Status** | **Description**                                                           |
| ---------- | ------------------------------------------------------------------------- |
| 200        | Success                                                                   |
| 404        | A project with the “project_id” owned by the current user does not exist. |

### PATCH `/projects/{project_id}/`

Update a project with the provided project ID

| **Status** | **Description**                                                           |
| ---------- | ------------------------------------------------------------------------- |
| 200        | Success                                                                   |
| 404        | A project with the “project_id” owned by the current user does not exist. |

### DELETE `/projects/{project_id}/`

Delete a project with the provided project ID

| **Status** | **Description**                                                           |
| ---------- | ------------------------------------------------------------------------- |
| 200        | Success                                                                   |
| 404        | A project with the “project_id” owned by the current user does not exist. |

## Variables

> Across all endpoints, if the user is not authenticated a `401 HTTP Response` will the received.

> Across all endpoints, if a project with the provided project ID does not exist a `404 HTTP Response` will be received.

### POST `/projects/{project_id/variables/`

Create a new variable in a project with the provided project ID and with the current user as the author.

| **Status** | **Description**                   |
| ---------- | --------------------------------- |
| 201        | Success                           |
| 400        | Provided variable data is invalid |

### GET `/projects/{project_id/variables/`

Get all variables in a project with the provided project ID and with the current user as the author.

| **Status** | **Description** |
| ---------- | --------------- |
| 200        | Success         |

### GET `/projects/{project_id/variables/{variable_id}/`

Get a variable with the provided variable ID from a project with the provided project ID and with the current user as the author.

| **Status** | **Description**             |
| ---------- | --------------------------- |
| 200        | Success                     |
| 404        | The variable does not exist |

### PATCH `/projects/{project_id/variables/{variable_id}/`

Update a variable with the provided variable ID from a project with the provided project ID and with the current user as the author.

| **Status** | **Description**                       |
| ---------- | ------------------------------------- |
| 200        | Success                               |
| 400        | The provided variable data is invalid |
| 404        | The variable does not exist           |

### DELETE `/projects/{project_id/variables/{variable_id}/`

Delete a variable with the provided variable ID from a project with the provided project ID and with the current user as the author.

| **Status** | **Description**             |
| ---------- | --------------------------- |
| 200        | Success                     |
| 404        | The variable does not exist |

## Configuration

| **Key**              | **Description**                                                                                                                               | **Default Value**                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| DEBUG                | Whether to run Django in debug mode or not.                                                                                                   | 1                                                      |
| DATABASE_URL         | The database url to which Django will connect to.                                                                                             | postgresql://postgres:postgres@localhost:5432/postgres |
| SECRET_KEY           | The secret key that django will use to run. Generate one by running the [keygen](../../scripts/fernet_keygen.py) script.                      | sk-django-secret-key                                   |
| ALLOWED_HOSTS        | A list of host that Django will allow to run on.                                                                                              | localhost,127.0.0.1                                    |
| CORS_ALLOWED_ORIGINS | A list of origins that Django will allow communication with.                                                                                  | [http://localhost:3000](http://localhost:3000/)        |
| ENCRYPTION_KEY       | An encryption key that will be used to encrypt and decrypt data. Generate one by running the [keygen](../../scripts/fernet_keygen.py) script. | ek-django-encryption-key                               |
| JWT_SIGNING_KEY      | A signing key to be used to sign the JWT access & refresh tokens. Generate one using the [keygen](../../scripts/fernet_keygen.py) script      |

## Testing

```bash
# Run tests
python manage.py test

```

## Contributing

Refer to the [CONTRIBUTING](../../CONTRIBUTING.md) for guidlines.

## License

This project uses the [MIT](../../LISENCE) Lisence.
