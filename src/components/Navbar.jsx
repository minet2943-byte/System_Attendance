import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { LogOut } from "lucide-react";

export default function Navbar({ title }) {
  const { user, logout } = useAuth();

  const getRoleLabel = (role) => {
    const roleMap = {
      TEACHER: "Teacher",
      STUDENT: "Student",
      ADMIN: "Administrator",
    };
    return roleMap[role] || role;
  };

  return (
    <header className="h-16 shrink-0 border-b border-slate-100 bg-white px-6 flex items-center justify-between">
   
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-lg text-slate-900 tracking-tight">{title}</h1>
      </div>
  
      <div className="flex items-center gap-4">
       
        <div className="flex items-center gap-3 pl-3 py-1 pr-1 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
       
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">
              {user?.name || "User"}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 leading-none font-bold mt-1">
              {getRoleLabel(user?.role)}
            </p>
          </div>

       
          <div className="h-8 w-8 rounded-lg bg-linear-to-br from-[#0052cc] to-[#0043a8] flex items-center justify-center text-xs font-bold text-white shadow-sm shadow-[#0052cc]/20">
            {user?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
        </div>

        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 transition-all duration-200 border border-transparent hover:border-rose-100"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">Sign out</span>
        </button>
      </div>
    </header>
  );
}