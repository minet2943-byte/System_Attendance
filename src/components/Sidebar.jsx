import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  GraduationCap,
  Users,
  CalendarDays,
  BarChart3,
  User,
  Settings,
} from "lucide-react";

export default function Sidebar({ role = "TEACHER" }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Teacher Navigation
  const teacherNavItems = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutGrid, path: "/teacher" },
    {
      id: "Classes",
      label: "Classes",
      icon: GraduationCap,
      path: "/teacher/class-management",
    },
    {
      id: "Students",
      label: "Students",
      icon: Users,
      path: "/teacher/student-roster",
    },
    {
      id: "Attendance",
      label: "Attendance",
      icon: CalendarDays,
      path: "/teacher/mark-attendance",
    },
    {
      id: "Reports",
      label: "Reports",
      icon: BarChart3,
      path: "/teacher/history",
    },
  ];

  const teacherBottomItems = [
    { id: "Profile", label: "Profile", icon: User, path: "/teacher/profile" },
    {
      id: "Settings",
      label: "Settings",
      icon: Settings,
      path: "/teacher/settings",
    },
  ];

  // Student Navigation
  const studentNavItems = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutGrid, path: "/student" },
    {
      id: "MyAttendance",
      label: "My Attendance",
      icon: CalendarDays,
      path: "/student/my-attendance",
    },
    {
      id: "Reports",
      label: "My Reports",
      icon: BarChart3,
      path: "/student/reports",
    },
  ];

  const studentBottomItems = [
    { id: "Profile", label: "Profile", icon: User, path: "/student/profile" },
  ];

  // Select navigation based on role
  const isStudent = role.toUpperCase() === "STUDENT";
  const mainNavItems = isStudent ? studentNavItems : teacherNavItems;
  const bottomNavItems = isStudent ? studentBottomItems : teacherBottomItems;

  const isPathActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const NavButton = ({ item }) => {
    const Icon = item.icon;
    const isActive = isPathActive(item.path);

    return (
      <button
        onClick={() => navigate(item.path)}
        className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-200 ${
          isActive
            ? "bg-[#dbeafe] text-[#0052cc]"
            : "text-[#475569] hover:bg-slate-50 hover:text-[#0f172a]"
        }`}
      >
        <Icon
          className={`w-5.5 h-5.5 ${isActive ? "text-[#0052cc]" : "text-[#475569]"}`}
          strokeWidth={2.2}
        />
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="w-65 h-screen flex flex-col justify-between bg-[#f8faff] border-r border-slate-100 p-6 rounded-tr-3xl rounded-br-3xl select-none">
      {/* Top Section */}
      <div className="flex flex-col gap-8">
        {/* Brand Header */}
        <div className="pl-3 pt-2">
          <h1 className="text-3xl font-extrabold text-[#0052cc] tracking-tight">
            EduAttend
          </h1>
          <p className="text-[13px] font-bold text-[#475569] mt-0.5 tracking-wide">
            Admin Portal
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          {mainNavItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <nav className="flex flex-col gap-1.5 border-t border-slate-100/60 pt-4">
        {bottomNavItems.map((item) => (
          <NavButton key={item.id} item={item} />
        ))}
      </nav>
    </aside>
  );
}
