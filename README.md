School Management System - MERN Stack Application

 Project Description:

   This is a School Management System developed using the MERN stack (MongoDB, Express, React, Node.js). The application provides role-based access control (RBAC) for three different roles:

> Admin: Full access to add/delete users and manage data of all users, including students.
> Office Staff: Can manage student data and fees.
> Librarian: Can only manage library-related items.

The backend implements JWT (JSON Web Tokens) for user authentication and authorization. React Router v6 and Redux Toolkit are used in the frontend for managing routes and state, respectively.

Setup Instructions

Prerequisites:
> Node.js and npm installed on your machine.
> MongoDB database connection.


Installation

1.Clone the repository:
> git clone https://github.com/asha-techspace/SchoolManagmentSystem.git
> cd SchoolManagementSystem

2.Install backend dependencies:
> cd backend
> npm install

3.Install frontend dependencies:
> cd ../frontend
> npm install

4.Set up the .env file (explained below).

5.Start the backend server:
> cd backend
> npm run dev

6.Start the frontend server:
> cd ../frontend
> npm run dev

Running in Development Mode:

> Backend will run on http://localhost:5000
> Frontend will run on http://localhost:5173

.env File

> Create a .env file in the backend directory with the following variables:
   PORT = 5000
   FRONTEND_URL = http://localhost:5173
   DATABASE_CONNECTION_URI = mongodb+srv://ashababurajsreelakam:ETOBIxCpZyP7erza@cluster0.uxdj6.mongodb.net/schoolManagementSystem
   ACCESS_TOKEN_SECRET_KEY = zhzEvT3PYTwWNn5kHellozhzEvT3PYTwWNn5k
   SESSION_SECRET = zhzEvT3PYTwWNn5kHellozhzEvT3PYTwWNn5k


List of Used Libraries

. Backend (Express):

> express: Web framework for Node.js.
> mongoose: ODM for MongoDB.
> jsonwebtoken: For generating and verifying JWT tokens.
> bcryptjs: For password hashing.
> dotenv: For loading environment variables.

. Frontend (React):

> react: JavaScript library for building user interfaces.
> react-redux: State management for React using Redux.
> redux-toolkit: Simplified way to write Redux logic.
> react-router-dom (v6): Client-side routing for React.
> axios: HTTP client for making requests to the backend.
> redux-persist: To persist Redux state across page refreshes.

Additional Information

> User Roles: 
  The system supports three roles—admin, office staff, and librarian, each with different access permissions as described in the  project description.
> JWT Authentication: 
  Each user must log in to get a token that will be used to authenticate and authorize the user for specific actions based on their role.
> Persistent Redux State: 
  The user authentication state is persisted in localStorage using redux-persist to avoid losing the state on page refresh.
