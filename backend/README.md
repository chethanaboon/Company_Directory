Note: To start the app, use [App Readme](../README.md). This is only for documentaion.

### Intial data setup and start server:
```sh
pip install django djangorestframework django-cors-headers
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py import_csv_data
python manage.py createsuperuser
python manage.py runserver
```

### Run Test Suite
`python manage.py test api`

### Superuser credentials
- Username: chethanabenny
- Email address: benny.c@northeastern.edu
- Password: 12345
- URL: `http://127.0.0.1:8000/admin/`

### Other Commands:
```sh
pip freeze 
pip freeze > requirements.txt
```

### Backend Debugging and Logging
- have written debug and specific error logs in Django
- Check backend logs
    - Login to the backend docker container
    - run `tail -f debug.log`

### API Endpoints

#### Get all companies

- **Endpoint**: `GET /companies/`
- **URL**: [http://127.0.0.1:8000/api/companies/]

#### Get company details by ID

- **Endpoint**: `GET /companies/{id}/`
- **URL**: [http://127.0.0.1:8000/api/companies/1/]

#### Get all locations for a specific company ID

- **Endpoint**: `GET /companies/{id}/locations/`
- **URL**: [http://127.0.0.1:8000/api/companies/1/locations/]

### API Documentation

- **Swagger**: `http://127.0.0.1:8000/api/swagger/`
- **Redoc**: `http://127.0.0.1:8000/api/redoc/#tag/companies`
