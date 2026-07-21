import React, { useState } from "react";
import {
  Search,
  Bell,
  HelpCircle,
  Globe,
  Plus,
  Notebook,
  Users,
  CalendarCheck,
  MoveUpRight,
  MoveDownRight,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  FileBarChart2,
  ChevronDown,
} from "lucide-react";

// Importing the CreateClassModal we polished earlier
import CreateClassModal from "../../components/CreateClassModal";

export default function TeacherDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState([
    { id: 1, code: "MATH-204", title: "Advanced Calculus II", room: "402B", schedule: "MWF 09:00 AM" }
  ]);

  // Dynamic Chart Data (Height percentages for the SVG bars)
  const chartData = [
    { day: "Mon", attendance: 92 },
    { day: "Tue", attendance: 88 },
    { day: "Wed", attendance: 95 },
    { day: "Thu", attendance: 90 },
    { day: "Fri", attendance: 85 },
  ];

  const metrics = [
    {
      title: "Total Classes",
      value: String(classes.length).padStart(2, "0"),
      badge: `+${classes.length - 1} this sem`,
      badgeBg: "bg-emerald-50 text-emerald-600",
      icon: Notebook,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Students",
      value: "242",
      badge: "242 Total",
      badgeBg: "bg-slate-100 text-slate-600",
      icon: Users,
      iconBg: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Today's Presence",
      value: "218",
      badge: "Update 1h ago",
      badgeBg: "bg-amber-50 text-amber-600",
      icon: CalendarCheck,
      iconBg: "bg-orange-50 text-orange-600",
    },
  ];

  const rateMetrics = [
    {
      label: "Present Rate",
      value: "90.2%",
      color: "text-blue-600",
      barColor: "bg-blue-600",
      borderColor: "border-l-[4px] border-l-blue-600",
      icon: MoveUpRight,
      iconBg: "bg-blue-50",
    },
    {
      label: "Absent Rate",
      value: "9.8%",
      color: "text-red-500",
      barColor: "bg-red-500",
      borderColor: "border-l-[4px] border-l-red-500",
      icon: MoveDownRight,
      iconBg: "bg-red-50",
    },
  ];

  const activities = [
    {
      type: "success",
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
      title: "Attendance Marked",
      desc: "Advanced Calculus - Section A",
      time: "10 MINUTES AGO",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
      title: "Low Attendance Alert",
      desc: "John Smith (ID: 2043) is below 75%",
      time: "2 HOURS AGO",
    },
    {
      type: "info",
      icon: UserPlus,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
      title: "New Student Enrolled",
      desc: "Sarah Connor added to Biology 101",
      time: "5 HOURS AGO",
    },
  ];

  const handleCreateClass = (newClassData) => {
    const newClass = {
      id: classes.length + 1,
      ...newClassData,
    };
    setClasses((prev) => [...prev, newClass]);
    setIsModalOpen(false);
    alert(`Class "${newClass.title}" created successfully!`);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#fafbfe] font-sans text-slate-800">
  
      {/* Primary Container Grid */}
      <main className="p-8 max-w-[1400px] mx-auto space-y-6">
        {/* Hero Meta Information */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Teacher Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Welcome back, Prof. Harrison. Here's your overview for today.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#0052cc] hover:bg-[#0043a8] text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Create Class
            </button>
          </div>
        </div>

        {/* Top-Level Metrics Array Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {metrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)] min-h-[120px]"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${item.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.badgeBg}`}>
                    {item.badge}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {item.title}
                  </p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}

          {rateMetrics.map((rate, index) => {
            const Icon = rate.icon;
            return (
              <div
                key={index}
                className={`bg-white border border-slate-100 rounded-xl p-4 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)] min-h-[120px] ${rate.borderColor}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${rate.iconBg} ${rate.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-sm font-black ${rate.color}`}>
                    {rate.value}
                  </span>
                </div>
                <div className="space-y-2 mt-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {rate.label}
                  </p>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${rate.barColor}`}
                      style={{ width: rate.value }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Analytics Breakdown & Feed Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active SVG Graph Container */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-xl p-5 flex flex-col justify-between min-h-[380px]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Weekly Attendance Rate
                </h3>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Daily classroom presence average (%)
                </p>
              </div>
              <button className="flex items-center gap-1 bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100">
                <span>This Week</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Dynamic Interactive SVG Bar Chart Graph */}
            <div className="flex-1 flex items-end justify-between px-6 pt-10 pb-2 relative h-48">
              {/* Chart Grid Lines */}
              <div className="absolute inset-x-0 top-10 bottom-2 flex flex-col justify-between pointer-events-none">
                <div className="w-full border-b border-dashed border-slate-100" />
                <div className="w-full border-b border-dashed border-slate-100" />
                <div className="w-full border-b border-dashed border-slate-100" />
                <div className="w-full border-b border-dashed border-slate-100" />
              </div>

              {/* Rendering Interactive Bars */}
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2 z-10 w-12 group">
                  <div className="relative w-full flex justify-center">
                    {/* Tooltip on Hover */}
                    <span className="absolute -top-8 bg-slate-800 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                      {data.attendance}%
                    </span>
                    {/* Bar Pill */}
                    <div 
                      style={{ height: `${data.attendance * 1.5}px` }} 
                      className="w-8 bg-[#0052cc]/10 group-hover:bg-[#0052cc] rounded-t-lg transition-all duration-300 ease-out"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-800 transition-colors">
                    {data.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Activities Widget Feed */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Recent Activity
                </h3>
                <a href="#view-all" className="text-xs font-semibold text-blue-600 hover:underline">
                  View All
                </a>
              </div>

              {/* Feed List Mapping */}
              <div className="space-y-4">
                {activities.map((act, index) => {
                  const Icon = act.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`p-2 rounded-full shrink-0 ${act.iconBg} ${act.iconColor}`}>
                        <Icon className="w-4 h-4" strokeWidth={2.5} />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-700 leading-tight">
                          {act.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-medium leading-normal">
                          {act.desc}
                        </p>
                        <p className="text-[9px] font-bold text-slate-400 tracking-wider pt-0.5">
                          {act.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Modal Component */}
      <CreateClassModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateClass} 
      />
    </div>
  );
}