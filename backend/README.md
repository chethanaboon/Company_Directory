### Installations:
```sh
pip install django djangorestframework django-cors-headers
```

### Commands:
```sh
pip freeze 
pip freeze > requirements.txt
```

### Intial data setup and start server:
```sh
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py import_csv_data
python manage.py runserver
```

### Superuser credentials
Username: chethanabenny
Email address: benny.c@northeastern.edu
Password: 12345
http://127.0.0.1:8000/admin/

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
