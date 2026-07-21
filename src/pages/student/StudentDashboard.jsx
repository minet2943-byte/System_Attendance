import { useEffect, useState, useMemo } from 'react'
import attendanceService from '../../services/attendanceService.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { StatusBadge } from '../../components/Table.jsx'

export default function StudentDashboard() {
  const { user } = useAuth()
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   attendanceService
    .getMyAttendance(user.id)
    .then((response) => setRecords(response.data))
    .catch((err) => console.error(err))
    .finally(() => setLoading(false));
  }, [user.id])

  // Memoize calculations
  const stats = useMemo(() => {
    const total = records.length
    if (!total) return { total: 0, present: 0, absent: 0, late: 0, rate: 0, recent: [] }

    const present = records.filter((r) => r.status === 'PRESENT').length
    const absent = records.filter((r) => r.status === 'ABSENT').length
    const late = records.filter((r) => r.status === 'LATE').length
    const rate = Math.round((present / total) * 100)

    const recent = [...records]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)

    return { total, present, absent, late, rate, recent }
  }, [records])

  return (
    <div className="space-y-6 p-6 bg-slate-50 min-h-screen">
      {/* Header Section - ប្តូរពណ៌អក្សរឱ្យដិតច្បាស់ងាយមើល */}
      <div>
        <h2 className="font-display text-2xl font-bold text-slate-800">
          Hello, {user?.name || 'Student'}
        </h2>
        <p className="text-sm text-slate-600 mt-1">Overview of your attendance records</p>
      </div>

      {/* Warning Banner - កែពណ៌ឱ្យដិតច្បាស់ងាយស្រួលអាន */}
      {!loading && stats.absent >= 3 && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3.5 text-sm font-medium text-red-700 shadow-sm animate-pulse">
          ⚠️ You have been absent {stats.absent} times. Please contact your instructor if there is an issue.
        </div>
      )}

      {/* Statistics Grid - បង្កើតជាប្លុកកាតពណ៌ស និងមានស្រមោលព័ទ្ធជុំវិញ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance Rate</p>
          <p className="mt-2 font-display text-3xl font-bold text-indigo-600">
            {loading ? '—' : `${stats.rate}%`}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Present</p>
          <p className="mt-2 font-display text-3xl font-bold text-emerald-600">
            {loading ? '—' : stats.present}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Late</p>
          <p className="mt-2 font-display text-3xl font-bold text-amber-500">
            {loading ? '—' : stats.late}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all hover:shadow-md">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Absent</p>
          <p className="mt-2 font-display text-3xl font-bold text-rose-600">
            {loading ? '—' : stats.absent}
          </p>
        </div>
      </div>

      {/* Recent History Panel - រៀបចំបញ្ជីឱ្យស្អាត និងច្បាស់លាស់ */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-lg text-slate-800 mb-4 border-b border-slate-100 pb-3">
          Recent Records
        </h3>
        
        {loading ? (
          <p className="text-sm text-slate-500 py-3 animate-pulse">Loading records...</p>
        ) : stats.recent.length === 0 ? (
          <p className="text-sm text-slate-500 py-4 text-center">No attendance records found</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {stats.recent.map((r) => (
              <li key={r.id || r.date} className="py-3.5 flex items-center justify-between hover:bg-slate-50/50 px-2 -mx-2 rounded-lg transition-colors">
                <span className="text-sm font-semibold text-slate-700">{r.date}</span>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}