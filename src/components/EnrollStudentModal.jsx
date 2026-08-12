import { useEffect, useState } from "react";
import enrollService from "../services/enrollService";
import { showError, showSuccess, showWarning } from "../utils/notifications";

export default function EnrollStudentModal({ isOpen, onClose, onSuccess }) {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [classId, setClassId] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
    } else {
      // Reset state when modal closes
      setStudentId("");
      setClassId("");
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      setFetching(true);
      // Fetch both datasets concurrently
      const [studentData, classData] = await Promise.all([
        enrollService.getStudents(),
        enrollService.getClasses(),
      ]);

      setStudents(studentData || []);
      setClasses(classData || []);
    } catch (error) {
      console.error("Failed to load modal data:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !classId) {
      showWarning("Please select both a student and a class.");
      return;
    }

    try {
      setLoading(true);

      await enrollService.enrollStudent({
        studentId: Number(studentId),
        classId: Number(classId),
      });

      showSuccess("Enrollment successful!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Enrollment error:", error);
      showError(
        error.response?.data?.message ||
        error.response?.data ||
        "Enrollment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent click-through closing
      >
        <h2 className="text-xl font-bold mb-5 text-gray-800">
          Enroll Student
        </h2>

        {fetching ? (
          <div className="text-center py-8 text-gray-500">
            Loading choices...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Student Dropdown */}
            <div className="mb-4">
              <label htmlFor="student-select" className="block text-sm font-medium text-gray-700 mb-1">
                Student
              </label>
              <select
                id="student-select"
                className="w-full border rounded-lg p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                disabled={loading}
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Dropdown */}
            <div className="mb-6">
              <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 mb-1">
                Class
              </label>
              <select
                id="class-select"
                className="w-full border rounded-lg p-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                disabled={loading}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.classTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Enroll"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
