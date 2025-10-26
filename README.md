# 👨‍💼 Employee Management System – Backend

The **Employee Management System (EMS)** is a backend application built using **Node.js**, **Express.js**, and **MySQL**.  
It provides **RESTful APIs** to manage employees, attendance, leaves, payrolls, and tasks efficiently.  
The system ensures **data consistency**, **secure authentication**, and **role-based authorization** for administrators, HR managers, and employees.

---

## 🧠 Project Overview

This backend service is designed to **digitize and automate employee-related operations** inside an organization.  
It reduces manual paperwork and helps administrators and HRs handle everything — from **employee onboarding** to **payroll generation** — in a single, connected system.  

The EMS backend exposes **RESTful APIs** that can be connected to any frontend interface such as **React**, **Angular**, or **React Native** mobile apps.

---

## 🎯 Key Objectives

- Simplify employee management and tracking  
- Automate attendance logging and leave approvals  
- Maintain accurate payroll calculations  
- Enforce role-based access for system security  
- Provide reliable REST APIs for frontend clients  

---

## 🚀 Features

### 👨‍💼 Employee Management
- Add, edit, view, and delete employees  
- Assign roles (Admin, HR, Employee)  
- Manage personal and work-related details  

### 🕒 Attendance Management
- Record login and logout time  
- Track working hours and attendance status  
- Generate attendance reports by date or employee  

### 📝 Leave Management
- Employees can apply for leave  
- HR/Admin can approve or reject leave requests  
- Automatic calculation of leave balance  

### 💰 Payroll Management
- Auto-calculate monthly salary based on attendance and leaves  
- Store and retrieve payment details securely  
- Generate salary slips *(future enhancement)*  

### 📋 Task Management
- Admin can assign daily/weekly tasks  
- Track progress and completion status of each task  

### 🔐 Authentication & Authorization
- Secure authentication using **JWT**  
- Password encryption using **bcrypt**  
- Role-based middleware for restricted access  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend Framework** | Node.js + Express.js |
| **Database** | MySQL |
| **ORM / Query Builder** | MySQL2 |
| **Authentication** | JWT (JSON Web Token) |
| **Security** | bcrypt, helmet, cors |
| **Validation** | express-validator |
| **Environment Management** | dotenv |
| **Logging & Debugging** | morgan, nodemon (development) |

---

## 📁 Project Structure

BACKEND/
│
├── config/ # Environment & Database setup
│ ├── env.config.js
│ ├── mysql.config.js
│
├── controllers/ # Business logic for modules
│ ├── attendance.controller.js
│ ├── auth.controller.js
│ ├── employee.controller.js
│ ├── leave.controller.js
│ ├── payroll.controller.js
│ ├── task.controller.js
│
├── middleware/ # Auth & Role-based Access
│ ├── auth.middleware.js
│ ├── role.middleware.js
│
├── models/mysql/ # MySQL Models (Database Layer)
│ ├── attendance.model.js
│ ├── employee.model.js
│ ├── payroll.model.js
│ ├── user.model.js
│
├── routes/ # API Endpoints (Routes)
│ ├── attendance.routes.js
│ ├── auth.routes.js
│ ├── employee.routes.js
│ ├── leave.routes.js
│ ├── payroll.routes.js
│ ├── task.routes.js
│
├── utils/ # Helper functions
│
├── app.js # App configuration (routes, middleware)
├── server.js # Entry point of the server
├── .env # Environment variables
├── package.json # Project metadata & dependencies
└── README.md # Documentation