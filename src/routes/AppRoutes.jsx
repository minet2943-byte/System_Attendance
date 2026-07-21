import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Layout
import TeacherLayout from "../layouts/TeacherLayout";
import StudentLayout from "../layouts/StudentLayout";

// Auth
import LoginForm from "../pages/auth/LoginForm";
import RegisterForm from "../pages/auth/RegisterForm";

// Teacher Pages
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import ClassManagement from "../pages/teacher/ClassManagement";
import StudentRoster from "../pages/teacher/StudentRoster";
import MarkAttendance from "../pages/teacher/MarkAttendance";
import History from "../pages/teacher/History";
import TeacherProfile from "../pages/teacher/TeacherProfile";
import TeacherSettings from "../pages/teacher/TeacherSettings";

// Student Pages
import StudentDashboard from "../pages/student/StudentDashboard";
import Profile from "../pages/student/Profile";
import MyAttendance from "../pages/student/MyAttendance";
import StudentReports from "../pages/student/StudentReports";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  // បើមិនទាន់ Login
  if (!user) {
    return <Navigate to="/login" />;
  }
  // ពិនិត្យ Role (case-insensitive comparison)
  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    return (
      <Navigate
        to={user.role.toLowerCase() === "teacher" ? "/teacher" : "/student"}
      />
    );
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* ទំព័រ Login */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Teacher Route */}
      <Route  path="/teacher"
        element={
          <ProtectedRoute role="teacher">
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard Teacher */}
        <Route index element={<TeacherDashboard />} />

        {/* Class Management */}
        <Route path="class-management" element={<ClassManagement />} />

        {/* Student Roster */}
        <Route path="student-roster" element={<StudentRoster />} />

        {/* Mark Attendance */}
        <Route path="mark-attendance" element={<MarkAttendance />} />

        {/* History */}
        <Route path="history" element={<History />} />

        {/* Teacher Profile */}
        <Route path="profile" element={<TeacherProfile />} />

        {/* Settings */}
        <Route path="settings" element={<TeacherSettings />} />
      </Route>

      {/* Student Route */}

      <Route path="/student"
            element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="my-attendance" element={<MyAttendance />} />
        <Route path="reports" element={<StudentReports />} />
      </Route>

      {/* បើ URL មិនត្រឹមត្រូវ */}

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
