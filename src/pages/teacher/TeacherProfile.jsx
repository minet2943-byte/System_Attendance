// src/pages/dashboard/TeacherProfile.jsx
import React, { useState, useEffect } from "react";
import { User, Loader2 } from "lucide-react";
import teacherService from "../../services/teacherService";

function TeacherField({ label, value }) {
  return (
    <div>
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-sm text-slate-800 font-medium">
        {value || '—'}
      </p>
    </div>
  );
}
console.log(JSON.parse(localStorage.getItem("user")));
export default function TeacherProfile() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    teacherService.getProfile()
      .then((data) => {
        setTeacher(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching teacher profile:", err);
        setError("Failed to load profile information.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-2">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-sm text-slate-500">Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        <User className="w-6 h-6 text-blue-600" />
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">Teacher Profile</h2>
          <p className="text-sm text-slate-500 mt-1">Academic overview and contact records</p>
        </div>
      </div>

      {/* Profile Card Layout */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Avatar & Identifiers */}
        <div className="sm:col-span-2 flex items-center gap-4 border-b border-slate-100 pb-4">
          <div className="h-16 w-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xl font-bold text-blue-600">
            {teacher?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-lg">{teacher?.name}</p>
            <p className="text-xs text-slate-500 font-medium">Teacher ID: {teacher?.id}</p>
          </div>
        </div>

        {/* Core Info Fields */}
        <TeacherField label="Email Address" value={teacher?.email} />
        <TeacherField label="Department" value={teacher?.department} />
        <TeacherField label="Phone Number" value={teacher?.phone} />
        <TeacherField label="Office Location" value={teacher?.office} />
        
        <div className="sm:col-span-2">
          <TeacherField label="Specialization / Research" value={teacher?.specialization} />
        </div>
      </div>
    </div>
  );
}