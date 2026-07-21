import { useState } from "react";
import {
  Search,
  Bell,
  HelpCircle,
  Calendar,
  Download,
  BarChart3,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

export default function StudentReports() {
  const [selectedMonth, setSelectedMonth] = useState("January 2024");

  // Mock student data
  const studentData = {
    name: "Sarah Jenkins",
    studentId: "#ST-882910",
    email: "sarah.j@eduattend.edu",
    class: "Math 101 - Section A",
  };

  // Mock monthly attendance data
  const monthlyData = [
    {
      month: "January 2024",
      total: 20,
      present: 19,
      absent: 1,
      late: 0,
      rate: 95,
    },
    {
      month: "December 2023",
      total: 22,
      present: 21,
      absent: 1,
      late: 0,
      rate: 95.5,
    },
    {
      month: "November 2023",
      total: 20,
      present: 18,
      absent: 2,
      late: 0,
      rate: 90,
    },
  ];

  const currentMonth =
    monthlyData.find((m) => m.month === selectedMonth) || monthlyData[0];

  const stats = [
    {
      label: "ATTENDANCE RATE",
      value: `${currentMonth.rate}%`,
      icon: BarChart3,
      iconBg: "bg-[#dbeafe]",
      iconColor: "text-[#0052cc]",
      trend: currentMonth.rate > 90 ? "✅ Excellent" : "⚠️ Needs Improvement",
      trendColor:
        currentMonth.rate > 90 ? "text-emerald-600" : "text-amber-600",
    },
    {
      label: "TOTAL PRESENT",
      value: currentMonth.present,
      icon: TrendingUp,
      iconBg: "bg-[#dcfce7]",
      iconColor: "text-emerald-600",
      trend: `out of ${currentMonth.total}`,
      trendColor: "text-emerald-600",
    },
    {
      label: "ABSENT",
      value: currentMonth.absent,
      icon: AlertCircle,
      iconBg: "bg-[#fee2e2]",
      iconColor: "text-red-600",
      trend:
        currentMonth.absent === 0
          ? "Perfect!"
          : `${((currentMonth.absent / currentMonth.total) * 100).toFixed(1)}%`,
      trendColor:
        currentMonth.absent === 0 ? "text-emerald-600" : "text-red-600",
    },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#fafbfe] font-sans text-[#1e293b]">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 w-4 h-4 text-slate-400 -translate-y-1/2 top-1/2" />
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full pl-11 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200/80 rounded-full text-sm placeholder-slate-400 focus:outline-none focus:border-[#0052cc] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-6">
          <button className="text-slate-500 hover:text-slate-800 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-slate-500 hover:text-slate-800 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>

          <div className="h-8 w-px bg-slate-200" />

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">
                {studentData.name}
              </p>
              <p className="text-xs font-semibold text-slate-400">
                {studentData.class}
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-[1400px] mx-auto space-y-8">
        {/* Title Section */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] tracking-tight">
              My Attendance Reports
            </h2>
            <p className="text-[15px] text-slate-500 font-medium mt-1">
              View your personal attendance history and statistics.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm px-5 py-3 rounded-xl shadow-sm transition-colors">
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>

        {/* Student Info Card */}
        <div className="bg-gradient-to-r from-[#0052cc] to-[#0043a8] text-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,82,204,0.15)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs font-semibold opacity-75 mb-1">
                Student Name
              </p>
              <p className="font-bold">{studentData.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold opacity-75 mb-1">
                Student ID
              </p>
              <p className="font-bold">{studentData.studentId}</p>
            </div>
            <div>
              <p className="text-xs font-semibold opacity-75 mb-1">Email</p>
              <p className="font-bold text-sm">{studentData.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold opacity-75 mb-1">Class</p>
              <p className="font-bold text-sm">{studentData.class}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-extrabold text-[#0f172a] mt-2">
                      {stat.value}
                    </p>
                    <p className={`text-xs font-bold mt-1 ${stat.trendColor}`}>
                      {stat.trend}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}
                  >
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Month Selector & Report */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          {/* Filter Section */}
          <div className="p-6 border-b border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-[#0f172a]">Select Month</h3>
            <div className="flex flex-wrap gap-3">
              {monthlyData.map((month) => (
                <button
                  key={month.month}
                  onClick={() => setSelectedMonth(month.month)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    selectedMonth === month.month
                      ? "bg-[#0052cc] text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {month.month}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Report */}
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-bold text-[#0f172a]">
              Attendance Summary - {selectedMonth}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                  Total Days
                </p>
                <p className="text-3xl font-bold text-[#0f172a]">
                  {currentMonth.total}
                </p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <p className="text-xs font-semibold text-emerald-600 uppercase mb-1">
                  Present
                </p>
                <p className="text-3xl font-bold text-emerald-700">
                  {currentMonth.present}
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <p className="text-xs font-semibold text-red-600 uppercase mb-1">
                  Absent
                </p>
                <p className="text-3xl font-bold text-red-700">
                  {currentMonth.absent}
                </p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <p className="text-xs font-semibold text-amber-600 uppercase mb-1">
                  Late
                </p>
                <p className="text-3xl font-bold text-amber-700">
                  {currentMonth.late}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-slate-700">
                  Attendance Rate
                </p>
                <p className="text-2xl font-bold text-[#0052cc]">
                  {currentMonth.rate}%
                </p>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0052cc] transition-all duration-300"
                  style={{ width: `${currentMonth.rate}%` }}
                />
              </div>
            </div>

            {/* Insights */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-sm font-bold text-blue-900 mb-2">
                💡 Insights
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  ✅ Your attendance is{" "}
                  {currentMonth.rate > 90 ? "excellent" : "needs improvement"}
                </li>
                <li>
                  📊 You've attended {currentMonth.present} out of{" "}
                  {currentMonth.total} classes
                </li>
                {currentMonth.absent > 0 && (
                  <li>
                    ⚠️ You have {currentMonth.absent} absence(s) this month
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
