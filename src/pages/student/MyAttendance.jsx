import { useEffect, useState, useMemo } from 'react'
import attendanceService from '../../services/attendanceService.js'
import Table, { StatusBadge } from '../../components/Table.jsx'

export default function MyAttendance() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

    useEffect(() => {
  attendanceService
    .getMyAttendance()
    .then((response) => setRecords(response.data))
    .catch((err) => console.error("Failed to fetch attendance:", err))
    .finally(() => setLoading(false));
}, []);
 

  // Memoize sorted records
  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [records])
  // Table configuration - ប្តូរ key មក 'subject' ឱ្យត្រូវនឹងទិន្នន័យក្នុង Service
  const columns = [
    { key: 'date', header: 'Date' },
    { key: 'subject', header: 'Class Name' }, // កែពី className មក subject វិញ
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ]

  return (
    <div className="space-y-6 p-6 bg-slate-50 min-h-screen">
      {/* Header Section - ប្តូរពណ៌អក្សរឱ្យដិតច្បាស់ងាយមើលលើផ្ទៃស */}
      <div>
        <h2 className="font-display text-2xl font-bold text-slate-800">
          My Attendance
        </h2>
        <p className="text-sm text-slate-600 mt-1">Your complete attendance history</p>
      </div>
      {/* Table Card Content - ដាក់តារាងចូលក្នុងកាតប្លុកពណ៌ស មានព្រំ និងស្រមោលស្អាត */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        {loading ? (
          <p className="text-sm text-slate-500 py-4 text-center animate-pulse">
            Loading attendance records...
          </p>
        ) : sortedRecords.length === 0 ? (
          <p className="text-sm text-slate-500 py-8 text-center">
            No attendance records history found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table columns={columns} data={sortedRecords} />
          </div>
        )}
      </div>
    </div>
  )
}