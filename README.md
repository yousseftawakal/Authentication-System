﻿# Authentication System

A simple authentication system built with Node.js. This project does not use a database server; instead, it stores user data in a JSON file. It supports user signup, login, and basic CRUD operations for user management. JSON Web Tokens (JWT) are used for authentication.

## Features

- **Signup**: Create a new user with a username, email, and password, and receive a JWT.
- **Login**: Authenticate with an email and password to receive a JWT.
- **Get All Users**: Retrieve a list of all users (requires authentication).
- **Get Single User**: Retrieve details of a specific user (requires authentication).
- **Update User**: Update user details (requires authentication).
- **Delete User**: Delete a user (requires authentication).

## Technologies Used

- **Node.js**: Runtime environment for the server.
- **Express.js**: Web framework for building the API.
- **JSON Web Tokens (JWT)**: For user authentication and authorization.
- **JSON File**: Used as a lightweight data storage solution.
- **Postman**: For testing the API endpoints.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yousseftawakal/Authentication-System.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Authentication-System
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000`.

## API Endpoints

### 1. Signup

- **URL**: `/signup`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "your-username",
    "email": "your-email@example.com",
    "password": "your-password"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "token": "your-jwt-token",
    "data": {
      "id": 1,
      "username": "your-username",
      "email": "your-email@example.com",
      "password": "your-hashed-password"
    }
  }
  ```

### 2. Login

- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "your-email@example.com",
    "password": "your-password"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "token": "your-jwt-token",
    "data": {
      "id": 1,
      "username": "your-username",
      "email": "your-email@example.com",
      "password": "your-hashed-password"
    }
  }
  ```

### 3. Get All Users

- **URL**: `/users`
- **Method**: `GET`
- **Headers**:
  ```
  Authorization: Bearer <your-jwt-token>
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "username": "user1",
        "email": "user1@example.com",
        "password": "user1-hashed-password"
      },
      {
        "id": 2,
        "username": "user2",
        "email": "user2@example.com",
        "password": "user2-hashed-password"
      }
    ]
  }
  ```

### 4. Get Single User

- **URL**: `/users/:id`
- **Method**: `GET`
- **Headers**:
  ```
  Authorization: Bearer <your-jwt-token>
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "username": "user1",
      "email": "user1@example.com",
      "password": "user1-hashed-password"
    }
  }
  ```

### 5. Update User

- **URL**: `/users/:id`
- **Method**: `PATCH`
- **Headers**:
  ```
  Authorization: Bearer <your-jwt-token>
  ```
- **Request Body**:
  ```json
  {
    "username": "updated-username",
    "email": "updated-email@example.com",
    "password": "updated-password"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "username": "updated-username",
      "email": "updated-email@example.com",
      "password": "updated-hashed-password"
    }
  }
  ```

### 6. Delete User

- **URL**: `/users/:id`
- **Method**: `DELETE`
- **Headers**:
  ```
  Authorization: Bearer <your-jwt-token>
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": null
  }
  ```

## Testing with Postman

1. Use the `/signup` endpoint to create a new user and get a JWT.
2. Use the `/login` endpoint to authenticate and get a JWT.
3. Use the JWT as a Bearer token in the `Authorization` header for protected routes (`/users`, `/users/:id`).
