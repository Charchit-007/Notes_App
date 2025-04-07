# Note Taking Application

## Project Overview
This is a full-stack note-taking application that allows users to register, login, create, edit, search, and delete notes. The application features a React frontend for the user interface and a Flask backend API for data management.

### Features
- User authentication (Register/Login)
- Create and manage personal notes
- Search functionality by note title or ID
- Expand/collapse note content
- Password management with validation
- Responsive design
- API documentation with Swagger UI

## Technologies Used

### Frontend
- React
- React Router DOM
- Axios for API requests
- Font Awesome for icons
- CSS for styling

### Backend
- Flask (Python web framework)
- Flask-CORS for cross-origin resource sharing
- Flasgger for API documentation and Swagger UI integration

## Setup Instructions

### Prerequisites
- Node.js and npm
- Python 3.6 or higher
- pip (Python package installer)

### Backend Setup
1. Clone the repository to your local machine
2. Navigate to the backend directory
3. Create a virtual environment (recommended) or you can skip to step 5:
   ```
   python -m venv venv
   ```
4. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```
5. Install the required dependencies:
   ```
   pip install flask flask-cors flasgger
   ```

### Frontend Setup
1. Navigate to the frontend directory
2. Install the required npm packages:
   ```
   npm install
   ```
3. Install additional required packages:
   ```
   npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome axios react-router-dom
   ```

## Running the Application

### Start the Backend Server
1. Navigate to the backend directory
2. Ensure your virtual environment is activated
3. Start the Flask application:
   ```
   python Notes_app.py
   ```
4. The backend server will run on `http://localhost:5000`
5. You can access the Swagger UI API documentation at `http://localhost:5000/apidocs/`

### Start the Frontend Development Server
1. Navigate to the frontend directory
2. Start the React development server:
   ```
   npm run dev
   ```
3. The frontend application will run on `http://localhost:3000`
4. Open your browser and navigate to `http://localhost:3000` or click on the link in the terminal

## API Documentation with Swagger

The API is documented using Flasgger, which provides a Swagger UI interface to interact with and test the API endpoints directly from your browser.

### Accessing Swagger UI
- Start the backend server
- Open your browser and navigate to `http://localhost:5000/apidocs/`
- The Swagger UI interface will display all available endpoints
- You can expand each endpoint to see details, required parameters, and response formats
- You can also test the API directly from the Swagger UI by providing the required parameters and clicking "Try it out"

### Swagger Documentation in Code
The API endpoints are documented in the code using docstrings with YAML syntax for Swagger. Each endpoint includes:
- Tags for categorization
- Parameters (path, query, or body)
- Request schemas
- Response codes and descriptions

## API Endpoints Documentation

The application provides the following RESTful API endpoints:

### Notes Endpoints

#### Create a Note
- **URL**: `/api/notes`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "title": "Note Title",
    "content": "Note Content"
  }
  ```
- **Success Response**: `201 Created`
- **Error Response**: `400 Bad Request` if title or content is missing

#### Get All Notes
- **URL**: `/api/notes`
- **Method**: `GET`
- **Success Response**: `200 OK` with array of notes

#### Get a Specific Note
- **URL**: `/api/notes/<note_id>`
- **Method**: `GET`
- **URL Parameters**: `note_id=[integer]`
- **Success Response**: `200 OK` with note object
- **Error Response**: `404 Not Found` if note doesn't exist

#### Update a Note
- **URL**: `/api/notes/<note_id>`
- **Method**: `PUT`
- **URL Parameters**: `note_id=[integer]`
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "content": "Updated Content"
  }
  ```
- **Success Response**: `200 OK`
- **Error Response**: `404 Not Found` if note doesn't exist

#### Delete a Note
- **URL**: `/api/notes/<note_id>`
- **Method**: `DELETE`
- **URL Parameters**: `note_id=[integer]`
- **Success Response**: `200 OK` with confirmation message

## Data Storage

### Backend
- Notes are stored in an in-memory Python array
- Data is non-persistent and will be lost when the server restarts
- Each note has an ID, title, and content

### Frontend
- User authentication data is stored in the browser's localStorage
- This includes user credentials and login status

## Testing
This project includes unit tests for both the backend (Flask) and frontend (React) components.
# For Backend 
- The backend tests use Flask’s built-in `test_client` to verify the core functionality of the API endpoints.
- test_app.py
To run this -> pytest test_app.py  

# For frontend 
- Navigate to -> src\Testfiles\Auth_form.test.jsx
ans make sure there is a setupTests.js

To run this -> npx vitest

## User Authentication

The application uses localStorage for user authentication. User credentials are stored locally and validated on login. In a production environment, this should be replaced with a more secure authentication system.

## Future Improvements

- Implement server-side user authentication
- Add database integration for persistent storage
- Add categories and tags for notes
- Implement rich text editing
