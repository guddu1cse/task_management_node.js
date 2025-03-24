# Task Management API

## Overview

This API provides authentication, user management, and task management functionalities, including task creation, updating, deletion, sorting, and filtering.

## Base URL

All endpoints are prefixed with:

- `/user` for user-related operations
- `/auth` for authentication
- `/task` for task-related operations

## Authentication Routes (`/auth`)

| Method | Endpoint    | Description                      |
| ------ | ----------- | -------------------------------- |
| POST   | `/register` | Registers a new user             |
| POST   | `/login`    | Logs in a user and returns a JWT |

## User Routes (`/user`)

| Method | Endpoint   | Description                                                    |
| ------ | ---------- | -------------------------------------------------------------- |
| GET    | `/profile` | Retrieves the logged-in user profile (requires authentication) |

## Task Routes (`/task`)

| Method | Endpoint                                 | Description                                  |
| ------ | ---------------------------------------- | -------------------------------------------- |
| POST   | `/`                                      | Creates a new task (requires authentication) |
| GET    | `/tasks`                                 | Fetches all tasks for the logged-in user     |
| PUT    | `/:id`                                   | Updates a specific task                      |
| DELETE | `/:id`                                   | Deletes a specific task                      |
| GET    | `/sortBy/:sortBy/sortOrder/:sortOrder`   | Fetches sorted tasks based on criteria       |
| GET    | `/filterBy/:filterBy/filterOn/:filterOn` | Fetches filtered tasks                       |
| GET    | `/query`                                 | Fetches tasks based on query parameters      |

## Status Codes

| Code | Meaning                                |
| ---- | -------------------------------------- |
| 200  | Success                                |
| 201  | Resource created successfully          |
| 400  | Bad request (invalid input)            |
| 401  | Unauthorized (authentication required) |
| 403  | Forbidden (no permission)              |
| 404  | Not found                              |
| 500  | Internal server error                  |

## Technologies Used

- Node.js
- Express.js
- MySQL
- JWT for authentication
- Bcrypt for password hashing
- ESLint with Google style guide

## Setup Instructions

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up `.env` file with necessary environment variables.
4. Start the server: `npm start`.

## Notes

- Make sure the database has a primary key (`id`) for all tables.
- All authentication-protected routes require a valid JWT token in the request headers.

---

Developed for efficient task management and secure user authentication.
