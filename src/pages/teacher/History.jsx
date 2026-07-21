import { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Download,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Loader2,
} from "lucide-react";
import attendanceApi from "../../services/attendanceApi"; // Adjust path if needed
import classService from "../../services/classService";

export default function History() {

  const [fromDate, setFromDate] = useState("2026-07-01");
  const [toDate, setToDate] = useState("2026-07-31");

  // API State
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [classes, setClasses] = useState([]);

   const [selectedClass, setSelectedClass] = useState("");

  // Fetch reports function
  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      // Adjust endpoint/params based on your backend route
 const response = await attendanceApi.getReports({

    classId: selectedClass,
    fromDate: fromDate,
    toDate: toDate

});
      // Response array from API
      setReportData(response.data);
    } catch (err) {
      console.error("Failed to fetch attendance history:", err);
      setError("Failed to load attendance report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
  try {

    const response = await classService.getClasses();

    console.log("Classes:", response.data);

    setClasses(response.data);

    // select class ដំបូង automatic
   if(response.data.length > 0){
  setSelectedClass(response.data[0].id);
}

  } catch(error){
    console.error("Failed to fetch classes:", error);
  }
};
  // Initial load
 useEffect(() => {

  fetchClasses();

}, []);

  // Compute overall summary stats dynamically from response data
  const calculatedStats = useMemo(() => {
    if (!reportData.length) {
      return { totalPresent: 0, totalAbsent: 0, avgRate: "0.0%" };
    }

    const totals = reportData.reduce(
      (acc, row) => {
        acc.present += row.present || 0;
        acc.absent += row.absent || 0;
        acc.rateSum += row.attendanceRate || 0;
        return acc;
      },
      { present: 0, absent: 0, rateSum: 0 }
    );

    const avgRate = (totals.rateSum / reportData.length).toFixed(1);

    return {
      totalPresent: totals.present,
      totalAbsent: totals.absent,
      avgRate: `${avgRate}%`,
    };
  }, [reportData]);

  const statsCards = [
    {
      label: "AVG ATTENDANCE",
      value: calculatedStats.avgRate,
      icon: BarChart3,
      iconBg: "bg-[#dbeafe]",
      iconColor: "text-[#0052cc]",
    },
    {
      label: "TOTAL PRESENT",
      value: calculatedStats.totalPresent.toString(),
      icon: TrendingUp,
      iconBg: "bg-[#dcfce7]",
      iconColor: "text-emerald-600",
    },
    {
      label: "TOTAL ABSENT",
      value: calculatedStats.totalAbsent.toString(),
      icon: AlertCircle,
      iconBg: "bg-[#fee2e2]",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#fafbfe] font-sans text-[#1e293b]">
      <main className="p-8 max-w-[1400px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Attendance Reports
            </h2>
            <p className="text-[15px] text-slate-500 font-medium mt-1">
              View detailed attendance history and analytics for your classes.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm px-5 py-3 rounded-xl shadow-sm transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Dynamic Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsCards.map((stat, i) => {
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

        {/* Filters & Table */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="p-6 border-b border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-[#0f172a]">Filter Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-2">
                  Select Class
                </label>
               <select
 value={selectedClass}
 onChange={(e)=>setSelectedClass(e.target.value)}
 className="w-full px-4 py-2.5 bg-[#f8fafc] border rounded-lg"
>

{
classes.map((cls)=>(
<option 
 key={cls.id}
 value={cls.classCode}
>
{cls.classCode} - {cls.classTitle}

</option>
))
}

</select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-2">
                  From Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 w-4 h-4 text-slate-400 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200/80 rounded-lg text-sm focus:outline-none focus:border-[#0052cc] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-2">
                  To Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 w-4 h-4 text-slate-400 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200/80 rounded-lg text-sm focus:outline-none focus:border-[#0052cc] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={fetchReports}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#0052cc] hover:bg-[#0043a8] text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {error ? (
              <div className="p-8 text-center text-red-500 font-medium">{error}</div>
            ) : reportData.length === 0 && !loading ? (
              <div className="p-8 text-center text-slate-400">No report data found.</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-[#f8fafc]">
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wide">
                      Date
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wide">
                      Present
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wide">
                      Absent
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wide">
                      Late
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wide">
                      Excuse
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wide">
                      Attendance Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        {new Date(row.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
                          {row.present}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-lg border border-red-100">
                          {row.absent}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100">
                          {row.late}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs font-semibold text-slate-600">
                          {row.excuse}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#0052cc]"
                              style={{ width: `${Math.min(row.attendanceRate, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-900 w-12 text-right">
                            {row.attendanceRate}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}