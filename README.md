# AWKUM University Portal Redesign

A comprehensive full-stack web application designed for Abdul Wali Khan University Mardan (AWKUM). This system manages student admissions, staff portals, user authentication, and administrative tasks through a modern, responsive interface.

## 🚀 Features

### Public Portal
- **Home & Information**: Mobile-responsive landing page with university details.
- **News & Updates**: Dynamic news system with filtering.
- **Admissions**: View active admission cycles and apply online.
- **Merit Lists**: Publicly accessible merit lists.

### 🎓 Student Module
- **Registration & Auth**: Secure student registration and login (Email/CNIC).
- **Online Application**: Apply for programs, track application status.
- **Merit Status**: Check admission status based on calculated merit.

### 👨‍🏫 Staff Module
- **Dedicated Portal**: Separate login for faculty and staff.
- **Dashboard**: View profile and employment status.
- **Attendance**: Track personal attendance records and statistics.

### 🛡️ Admin Dashboard
- **Dashboard Overview**: Real-time stats and recent activities.
- **Management Tools**:
    - **News**: Create, edit, and delete news announcements.
    - **Admissions**: Open/close admission cycles.
    - **Staff**: Manage staff accounts (CRUD) and view details.
- **Merit System**:
    - Manage applicants.
    - Automated merit calculation/generation based on academic scores.

## 🛠️ Tech Stack

### Frontend (`/web`)
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State/HTTP**: Context API, Axios

### Backend (`/server`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Custom JSON-based database (`jsonDb.js`) for portability.
- **Authentication**: JWT (JSON Web Tokens) with separate Student/Staff/Admin roles.

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+ recommended)
- NPM

### 1. Backend Setup
The backend runs on port `5000`.

```bash
cd server
npm install
# Create a .env file if needed (default port is 5000)
node index.js
```

### 2. Frontend Setup
The frontend runs on Vite's default port (usually `5173`).

```bash
cd web
npm install
npm run dev
```

## 🔑 Default Access

- **Admin Login**: Access via `/admin/login`
- **Staff Login**: Access via `/staff/login`
- **Student Login**: Access via `/login`

## 📂 Project Structure

```
├── server/                 # Backend Logic
│   ├── db/                 # JSON Database files
│   ├── middleware/         # Auth Middleware (JWT)
│   ├── routes/             # API Endpoints (news, merit, staff, etc.)
│   └── index.js            # Server entry point
│
├── web/                    # Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── layouts/        # Layout wrappers (Main, Admin, Staff)
│   │   ├── pages/          # Feature pages
│   │   └── services/       # API integration
│   └── index.css           # Tailwind imports
```
