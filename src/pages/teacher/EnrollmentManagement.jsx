import { useEffect, useState } from "react";
import EnrollStudentModal from "../../components/EnrollStudentModal";
import enrollService from "../../services/enrollService";

export default function EnrollmentManagement() {
  const [enrollments, setEnrollments] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await enrollService.getEnrollments();
      setEnrollments(data || []);
    } catch (err) {
      console.error("Failed to load enrollments:", err);
      setError("Unable to load enrollments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Enrollment Management</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          + Enroll Student
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Content Area */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading enrollments...</div>
      ) : enrollments.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-gray-50 text-gray-500">
          No enrollments found. Click "+ Enroll Student" to add one.
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b text-sm font-semibold text-gray-700">
              <tr>
                <th className="p-3 border-r">Student</th>
                <th className="p-3">Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
              {enrollments.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 border-r">{item.studentName}</td>
                  <td className="p-3">{item.classTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <EnrollStudentModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={loadEnrollments}
      />
    </div>
  );
}