FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Ensure the CSV files are in the correct location
COPY companies.csv .
COPY locations.csv .

# Run the management command to import CSV data
RUN python manage.py import_csv_data

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]