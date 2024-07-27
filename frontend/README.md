Note: To start the app, use [App Readme](../README.md). This is only for documentaion.

### Intial setup and start server:
```sh
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install react-router-dom axios leaflet react-leaflet
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev jest-environment-jsdom
npm install --save-dev @babel/preset-env @babel/preset-react
npm run dev
```

### Run Test Suite
- run all : `npm run test`
- run individually : `npm test -- <test_file_name>`

## Folder Structure
    frontend/
    ├── public/
    │ └── image.png
    ├── src/
    │ ├── assets/
    │ ├── components/
    │ │  ├── CompanyDetails.jsx
    │ │  ├── CompanyList.jsx
    │ │  └── MapView.jsx
    │ ├── tests/
    │ │  └── ... all tests
    │ ├── utils
    │ │   ├── geoUtils.js
    │ │   └── regions.js
    │ ├── App.css
    │ ├── index.css
    │ └── main.jsx
    ├── package-lock.json
    ├── Dockerfile
    ├── index.html
    ├── jest.config.cjs
    ├── setupTests.js
    ├── vite.config.js
    ├── .gitignore
    ├── README.md
    └── package.json


