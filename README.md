# TeamTrack Backend

A RESTful backend API for **TeamTrack**, a team and task management application. The backend provides secure authentication, project management, team management, task tracking, reporting, and user settings.

---

## 🚀 Features

### Authentication

- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Get Current Logged-in User

### Project Management

- Create Project
- Get All Projects
- Get Project Details
- Update Project

### Team Management

- Create Team
- Get All Teams
- Get Team Details

### Task Management

- Create Task
- Get All Tasks
- Get Task Details
- Update Task
- Update Task Status
- Backend Status Transition Validation

### User Settings

- Update Profile
- Change Password
- Account Summary

### Reports

- Weekly Completed Tasks
- Pending Work Report
- Closed Tasks Report
  - Team-wise
  - Owner-wise
  - Project-wise

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- CORS

---

## 📂 Folder Structure

```
backend
│
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── validations/
├── db/
├── .env
├── server.js
└── package.json
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/teamtrack-backend.git
```

Go to the project directory

```bash
cd teamtrack-backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Start the development server

```bash
npm run dev
```

Server runs on

```
http://localhost:3000
```

---

## 🔐 Authentication

Protected routes require a JWT token.

```
Authorization: Bearer <your_token>
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/auth/signup` | Register a new user |
| POST   | `/api/auth/login`  | Login user          |
| GET    | `/api/auth/me`     | Get current user    |

---

## Users

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| GET    | `/api/users`                 | Get all users       |
| PATCH  | `/api/users/profile`         | Update profile      |
| PATCH  | `/api/users/change-password` | Change password     |
| GET    | `/api/users/account-summary` | Get account summary |

---

## Projects

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | `/api/projects`            | Create project      |
| GET    | `/api/projects`            | Get all projects    |
| GET    | `/api/projects/:projectId` | Get project details |
| PATCH  | `/api/projects/:projectId` | Update project      |

---

## Teams

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| POST   | `/api/teams`         | Create team      |
| GET    | `/api/teams`         | Get all teams    |
| GET    | `/api/teams/:teamId` | Get team details |

---

## Tasks

| Method | Endpoint                    | Description        |
| ------ | --------------------------- | ------------------ |
| POST   | `/api/tasks`                | Create task        |
| GET    | `/api/tasks`                | Get all tasks      |
| GET    | `/api/tasks/:taskId`        | Get task details   |
| PATCH  | `/api/tasks/:taskId`        | Update task        |
| PATCH  | `/api/tasks/:taskId/status` | Update task status |

---

## Reports

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| GET    | `/api/report/last-week`    | Last week report    |
| GET    | `/api/report/pending`      | Pending work report |
| GET    | `/api/report/closed-tasks` | Closed tasks report |

---

## 🛡 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Backend Input Validation
- Status Transition Validation
- Secure Password Change

---

## 📊 Reports

The backend generates:

- Completed tasks in the last 7 days
- Total pending work
- Tasks closed by team
- Tasks closed by owner
- Tasks closed by project

---

## 🌐 Deployment

The backend can be deployed on platforms like:

- Render
- Railway
- VPS
- AWS EC2

---

## 📚 What I Learned

During this project, I learned how to:

- Build RESTful APIs using Express.js
- Design MongoDB schemas with Mongoose
- Implement JWT Authentication & Authorization
- Hash passwords using bcrypt
- Create reusable service and validation layers
- Manage relationships between Users, Projects, Teams, and Tasks
- Implement backend business rules like task status transition validation
- Generate analytical reports using MongoDB aggregation
- Structure a scalable backend project

---

## 👨‍💻 Author

**Mohd Ajmal Raza**
