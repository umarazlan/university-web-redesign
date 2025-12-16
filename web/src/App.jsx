import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import News from './pages/News';
import Admissions from './pages/Admissions';
import MeritList from './pages/MeritList';
import Login from './pages/admin/Login';
import StaffLogin from './pages/staff/StaffLogin';
import StaffLayout from './layouts/StaffLayout';
import StaffHome from './pages/staff/StaffHome';
import StaffAttendance from './pages/staff/StaffAttendance';
import ManageStaff from './pages/admin/ManageStaff';

import Register from './pages/auth/Register';
import StudentLogin from './pages/auth/StudentLogin';
import MeritCheck from './pages/student/MeritCheck';

import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageNews from './pages/admin/ManageNews';
import ManageAdmissions from './pages/admin/ManageAdmissions';
import Applicants from './pages/admin/Applicants';
import MeritGenerator from './pages/admin/MeritGenerator';
import About from './pages/About';

// const About = () => <div className="p-8"><h1 className="text-2xl">About Page (Coming Soon)</h1></div>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* ... existing public routes ... */}
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="merit-lists" element={<MeritList />} />
            <Route path="about" element={<About />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<StudentLogin />} />
            <Route path="check-merit" element={<MeritCheck />} />
          </Route>

          {/* Staff Routes */}
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<StaffHome />} />
            <Route path="attendance" element={<StaffAttendance />} />
          </Route>

          <Route path="/admin/login" element={<Login />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="news" element={<ManageNews />} />
            <Route path="admissions" element={<ManageAdmissions />} />
            <Route path="merit-generator" element={<MeritGenerator />} />
            <Route path="applicants" element={<Applicants />} />
            <Route path="staff" element={<ManageStaff />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
