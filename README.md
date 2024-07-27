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
1. Page 1:
    - Shows a grid of all companies from db as cards. Each card shows name and main location's address
    - Dynamic search bar: searches for company by name on key press. Do not have to click enter
    - On click of company card, redirects to page 2
2. Page 2:
    - Map component
        - Integrated a map component using leaflet
        - The map shows markers of all locations of the company
        - On page landing, the map would be focused on the main location. But on zoom out you can see all other locations.
        - On click of marker, a popup opens showing name, address, coordinates and region of that location.
    - All locations List
        - A list of all locations are shown. Each list displays name, address, coordinates and region of that location.
        - On click of a list item, it will get selected and the page will scroll up to the map to show the selected location in focus in the map.
    - Filters
        - Search by location name filter: dynamic location name search similar to company search in page 1
        - Filter by region: Used reverse geo coding to find which business regions(EMEA, NA, LATAM, APAC) the locations fall into. On click of filter dropdown option, the locations in that region would be diplsyed in the list. NOTE: All the sample data fall into the same region NA.
        - Closest to me: If user enables broswer location services, this feature would fing the nearest location to that user.  
    - Directions
        - Integrated google map directions to get directions to that location. This is available in the map marker popup as well as in the list item
3. Responsive design
    - Used cdd grids and wrote media queries to maintain a responsive design
- EXCEPTION: if locations are filtered, find closest to me feature still finds closest location from all locations
 
## Start the App
- Build and start all containers in one go(run in root directory) : `docker-compose up --build --force-recreate`
    - Backend and frontend tests will run and results will be shown in console. NOTE: added tests as services for ease of running. In prod, we can remove these containers.
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
- Frontend: Around 50% test coverage

## Folder Structure
    company_directory_project/
    ├── backend/
    ├── frontend/
    ├── .gitignore
    ├── docker-compose.yml
    └── README.md

## Developer Details
- Name : Chethana Benny
- Email : benny.c@northeastern.edu
- Phone : +18573950964
- Github : https://github.com/chethanaboon/Company_Directory
- Linkedin : [www.linkedin.com/in/chethana-benny](https://www.linkedin.com/in/chethana-benny/)

