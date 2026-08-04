import { useEffect, useState, useMemo } from "react";
import attendanceService from "../../services/attendanceService.js";
import studentService from "../../services/studentService.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { StatusBadge } from "../../components/Table.jsx";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [studentInfo, setStudentInfo] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Student Profile
  useEffect(() => {
    if (!user?.token) {
      setStudentInfo(null);
      setRecords([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    studentService
      .getMyProfile()
      .then((data) => {
        setStudentInfo(data);
      })
      .catch((err) => {
        console.error("Error fetching student profile:", err);
        setStudentInfo(null);
        setRecords([]);
        setLoading(false);
      });
  }, [user?.id, user?.token]);

  // 2. Fetch Attendance Records
  useEffect(() => {
    if (!studentInfo?.id) return;

    attendanceService
      .getMyAttendance(studentInfo.id)
      .then((response) => {
        const data = Array.isArray(response) ? response : response?.data || [];
        setRecords(data);
      })
      .catch((err) => {
        console.error("Error fetching attendance records:", err);
        setRecords([]);
      })
      .finally(() => setLoading(false));
  }, [studentInfo]);

  // Memoize calculations
  const stats = useMemo(() => {
    const total = records.length;
    if (!total)
      return { total: 0, present: 0, absent: 0, late: 0, rate: 0, recent: [] };

    const present = records.filter((r) => r.status === "PRESENT").length;
    const absent = records.filter((r) => r.status === "ABSENT").length;
    const late = records.filter((r) => r.status === "LATE").length;
    const rate = Math.round((present / total) * 100);

    const recent = [...records]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    return { total, present, absent, late, rate, recent };
  }, [records]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          Hello, {studentInfo?.name || user?.name || "Student"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          <span className="font-medium text-slate-700">Code:</span>{" "}
          {studentInfo?.studentCode || "N/A"}{" "}
          <span className="hidden sm:inline">|</span>{" "}
          <br className="sm:hidden" />
          Overview of your attendance records
        </p>
      </div>

      {/* Warning Banner */}
      {!loading && stats.absent >= 3 && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 sm:p-4 text-xs sm:text-sm font-medium text-red-700 shadow-sm animate-pulse flex items-center gap-2">
          <span>⚠️</span>
          <span>
            You have been absent <strong>{stats.absent}</strong> times. Please
            contact your instructor if there is an issue.
          </span>
        </div>
      )}

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Attendance Rate
          </p>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-indigo-600">
            {loading ? "—" : `${stats.rate}%`}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Present
          </p>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-emerald-600">
            {loading ? "—" : stats.present}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Late
          </p>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-amber-500">
            {loading ? "—" : stats.late}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Absent
          </p>
          <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-rose-600">
            {loading ? "—" : stats.absent}
          </p>
        </div>
      </div>

      {/* Recent History Panel */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
        <h3 className="font-bold text-base sm:text-lg text-slate-800 mb-4 border-b border-slate-100 pb-3">
          Recent Records
        </h3>

        {loading ? (
          <p className="text-xs sm:text-sm text-slate-500 py-3 animate-pulse">
            Loading records...
          </p>
        ) : stats.recent.length === 0 ? (
          <p className="text-xs sm:text-sm text-slate-500 py-4 text-center">
            No attendance records found
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {stats.recent.map((r) => (
              <li
                key={r.id || r.createdAt}
                className="py-3 sm:py-3.5 flex items-center justify-between hover:bg-slate-50/50 px-2 -mx-2 rounded-lg transition-colors"
              >
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  {new Date(r.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
