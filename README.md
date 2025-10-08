# Incident Management System

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application built as a simple system for users to report and manage incidents.


## Live Demo

**[🚀 View the live application here!](https://incident-management-system-t0i3.onrender.com)**

---

## Features

- **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
- **Incident Management:** Authenticated users can create, view, and edit their own incidents.
- **Role-Based Access:** Users can only view and edit incidents that they have reported.
- **Unique Incident IDs:** Incidents are automatically assigned a unique, formatted ID (e.g., `FW123452025`).
- **Status Control:** Incidents with a `Closed` status cannot be edited, ensuring data integrity.
- **Responsive UI:** A clean user interface built with React and styled with Tailwind CSS.

---

## Tech Stack

- **Frontend:** React.js, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT), bcryptjs

---

## Getting Started: Local Setup

To run this project locally, follow these steps.

### Prerequisites

- Node.js (v14+)
- npm (Node Package Manager)
- MongoDB (A local installation or a free cloud instance from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file in the 'backend' directory
#    and add the following variables:
#    MONGO_URI=<your_mongodb_connection_string>
#    JWT_SECRET=<your_jwt_secret_key>

# 4. Start the backend server
npm run dev

```

### 1. Frontend Setup

```bash
# 1. Open a new terminal and navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create a .env file in the 'frontend' directory
#    and add the following variable:
#    REACT_APP_API_URL=http://localhost:5000/api

# 4. Start the frontend development server
npm start

```

### Environment Variables

You must create `.env` files in both the `backend` and `frontend` directories for the application to work.

#### Backend (`backend/.env`)
```env
# Your MongoDB connection string
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/yourDatabaseName

# A long, random, secret string for signing JWTs
JWT_SECRET=your_super_secret_jwt_key

# The port for the backend server to run on
PORT=7777
 ```

## Contact

**Astha Ade** **[Github](https://github.com/asthaade)** - **[Linkedln](https://www.linkedin.com/in/astha-ade-7167aa24b)**
