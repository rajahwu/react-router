# Pantry Management App

## Overview

The Pantry Management App is a React-based application designed to showcase the ability to build an application with CRUD (Create, Read, Update, Delete) operations and interact with Firebase. This project demonstrates the integration of React Router for navigation, Firebase Authentication for user management, and various React features to manage and display data.

## Features

* User Authentication: Secure login and registration system using Firebase Authentication.
* Protected Routes: Conditional access to certain routes based on user authentication status.
* CRUD Operations: Manage pantry items with Create, Read, Update, and Delete functionalities.
* Responsive Design: User-friendly interface with responsive design principles.

### Project Setup

#### Prerequisites
Node.js (v18 or later)
npm or yarn
Firebase account

#### Installation

##### Clone the Repository

sh```
git clone <repository-url>
cd <project-directory>
```
##### Install Dependencies

sh```
npm install
Firebase Configuration
```

##### Create a Firebase project at Firebase Console.
##### Add Firebase configuration to src/firebase.config.js.

#### Environment Setup

Make sure you have a .env file at the root of the project with your Firebase configuration.

Run the Application

sh```
npm run dev
The application should now be running at http://localhost:5173.
```
### Features and Functionality

Authentication
Register: Users can create a new account using their email and password.
Login: Existing users can log in to access their accounts.
Sign-Out: Users can log out, which redirects them to the login page.

Protected Routes
Users who are not authenticated are redirected to the login page when trying to access protected routes.
CRUD Operations
Create: Add new items to the pantry.
Read: View all items in the pantry.
Update: Edit existing items in the pantry.
Delete: Remove items from the pantry.

Routing
Home: Displays main content or a protected route based on authentication status.
Login: Allows users to log in.
Register: Allows users to create a new account.
SignOut: Logs users out of their account.

Project Structure

```arduino
# tree -I 'node_modules'
.
├── README.md
├── docs
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── App
│   │   │   └── index.jsx
│   │   ├── Footer
│   │   │   └── index.jsx
│   │   ├── Header
│   │   │   └── index.jsx
│   │   └── layouts
│   │       ├── index.js
│   │       └── root.jsx
│   ├── context
│   │   └── AuthContext.jsx
│   ├── firebase.config.js
│   ├── firebase.js
│   ├── index.css
│   ├── lib
│   ├── main.jsx
│   ├── router
│   │   └── index.jsx
│   └── routes
│       ├── auth
│       │   ├── ProtectedRoute.jsx
│       │   ├── login.jsx
│       │   ├── register.jsx
│       │   └── signout.jsx
│       ├── index.js
│       ├── pantry
│       │   └── index.jsx
│       └── root.jsx
├── tailwind.config.js
└── vite.config.js

15 directories, 26 files
```

## Notes
Ensure your Firebase rules and settings allow read/write access as needed.
Update the Firebase configuration and environment variables as appropriate for your setup.