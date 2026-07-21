// src/pages/dashboard/TeacherSettings.jsx
import React, { useState } from "react";
import { Settings, Bell, Lock, User } from "lucide-react";

export default function TeacherSettings() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6 p-6 max-w-2xl">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6 text-blue-600" />
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">Settings</h2>
          <p className="text-sm text-slate-500 mt-1">Manage your account preferences and configurations</p>
        </div>
      </div>

      {/* Settings Container */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl divide-y divide-slate-100">
        
        {/* Section 1: Account Preference */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm uppercase tracking-wider">
            <User className="w-4 h-4 text-slate-500" />
            <span>Account Display</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Language</label>
              <select className="w-full text-sm font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition">
                <option value="en">English</option>
                <option value="kh">Khmer</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Notifications */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm uppercase tracking-wider">
            <Bell className="w-4 h-4 text-slate-500" />
            <span>Notifications</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">Email Alerts</p>
              <p className="text-xs text-slate-500">Receive weekly attendance summaries and system updates</p>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 outline-none ${notifications ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${notifications ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Section 3: Security */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm uppercase tracking-wider">
            <Lock className="w-4 h-4 text-slate-500" />
            <span>Security</span>
          </div>
          <div>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
              Change Account Password →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}