# Company Directory

Hi Guys!

Let make our fullstack Company Directory app :)

I am using Django REST for the backend and ReactJS for the frontend.

NOTE: This README.md provides an overall documentation including how to start the app. For detailed backend and frontend documnetation, please read README files in the specific folders:
- Backend Documentation : [Backend Readme](./backend/README.md)
- Frontend Documentation : [Frontend Readme](./frontend/README.md)

## Project Description:

Create a web application that displays a list of companies and their details, including multiple possible locations. The application should have a Python backend API, a React frontend with a two-page structure and map integration, and be containerized using Docker.

## Key Features:
1. Map user interface

## Start the App
- Build and start all containers in one go(run in root directory) : `docker-compose up --build --force-recreate`
    - Backend and frontend tests will run and results will be shown in console
    - Frontend will start at :  http://localhost:5173
    - Backend will start at : http://localhost:8000

### Other Useful Docker commands:
- Start all containers : `docker-compose up`
- Check if images are up : `docker ps`
- All services (from docker-compose.yml) : 
    - backend
    - frontend
    - backend-test
    - frontend-test
- Start a specific container : `docker-compose run <service_name>`
- Login to the container:
    - get container_id from `docker ps`
    - run `exec -it <container_id> bash`
- Check backend logs
    - Login to the backend container
    - run `tail -f debug.log`

## Test Coverage
- Backend: Provided 100% test coverage as the APIs are limited
- Frontend: Around 70% test coverage

## Developer Details
- Name : Chethana Benny
- Email : benny.c@northeastern.edu
- Phone : +18573950964
- Github : https://github.com/chethanaboon/Company_Directory
- Linkedin : [www.linkedin.com/in/chethana-benny](https://www.linkedin.com/in/chethana-benny/)

