import React, { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Edit2,
  Trash2,
  X,
  Save,
} from "lucide-react";
import studentService from "../../services/studentService";
import { confirmDelete, showError, showSuccess } from "../../utils/notifications";

const getGenderLabel = (student) => {
  const gender = student.gender ?? student.Gender ?? student.sex;

  if (!gender) return "Not provided";

  return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
};

export default function StudentRoster() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Drawer / Editing States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const response = await studentService.getAllStudents();
      const studentData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : response?.data?.data || [];

      console.log("Student API:", studentData);

      setStudents(studentData);
    } catch (error) {
      console.error("Error loading students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };
  // Open Drawer to Edit
  const handleEditClick = (student) => {
    setSelectedStudent({ ...student });
    setIsDrawerOpen(true);
  };

  // Handle Input Changes inside Drawer Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update Student Function
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    const targetId = selectedStudent.id || selectedStudent.studentCode;
    try {
      await studentService.updateStudent(targetId, selectedStudent);
      showSuccess("Student updated successfully!");
      setIsDrawerOpen(false);
      loadStudents(); // Refresh data grid
    } catch (error) {
      console.error("Error updating student:", error);
      showError("Failed to update student settings.");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Student Function
  const handleDeleteStudent = async (targetId) => {
    const isConfirmed = await confirmDelete("this student record");
    if (!isConfirmed) return;

    try {
      await studentService.deleteStudent(targetId);

      // Dynamically filter out state elements supporting either id or studentCode matches
      setStudents((prev) =>
        prev.filter(
          (student) =>
            student.id !== targetId && student.studentCode !== targetId,
        ),
      );
      // Close the editing drawer seamlessly if the deleted record was open
      if (
        isDrawerOpen &&
        (selectedStudent?.id === targetId ||
          selectedStudent?.studentCode === targetId)
      ) {
        setIsDrawerOpen(false);
      }

      showSuccess("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      showError("Failed to delete student record.");
    }
  };

  // Filter students based on search match
  const filteredStudents = students.filter((student) => {
    const targetName = student.name?.toLowerCase() || "";
    const targetId = String(student.id || "").toLowerCase();
    const targetCode = student.studentCode?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return (
      targetName.includes(search) ||
      targetId.includes(search) ||
      targetCode.includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-[#f8f9fc] px-12 py-8 text-[#1e293b] relative overflow-x-hidden">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#0f172a]">
            Student Roster
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage comprehensive student profiles, security codes, and core
            operations.
          </p>
        </div>
      </div>

      {/* SEARCH AND CONTROLS */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex justify-between items-center">
        <div className="relative w-80">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            placeholder="Search by name, ID, or code..."
            className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="text-xs font-semibold text-slate-400">
          Showing {filteredStudents.length} of {students.length} Total Records
        </div>
      </div>

      {/* ROSTER TABLE CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
              <th className="py-4 px-6">Student Info</th>
              <th className="py-4 px-6">System Code</th>
              <th className="py-4 px-6">Gender</th>
              <th className="py-4 px-6">Email Address</th>
              <th className="py-4 px-6">Phone Number</th>
              <th className="py-4 px-6">Date of Birth</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              // Pulse Skeleton Loaders
              [...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-28" />
                      <div className="h-3 bg-slate-200 rounded w-16" />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-slate-200 rounded w-20" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-slate-200 rounded w-20" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-slate-200 rounded w-40" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-slate-200 rounded w-24" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 bg-slate-200 rounded w-24" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-8 bg-slate-200 rounded w-16 mx-auto" />
                  </td>
                </tr>
              ))
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-12 text-sm text-slate-400 font-medium"
                >
                  No matching records found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr
                  key={student.id || student.studentCode}
                  className="hover:bg-slate-50/50 transition"
                >
                  {/* Avatar & Identifiers */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm border border-blue-100">
                        {student.name
                          ? student.name.charAt(0).toUpperCase()
                          : "?"}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">
                          {student.name}
                        </div>
                        <div className="text-xs text-slate-400 font-medium mt-0.5">
                          DB-ID: {student.id || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Code */}
                  <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-600">
                    {student.studentCode}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-600">
                    {getGenderLabel(student)}
                  </td>

                  {/* Email */}
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {student.email}
                  </td>

                  {/* Phone */}
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {student.phoneNumber || (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  {/* Date of Birth */}
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {student.dateOfBirth || (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  {/* Table Actions */}
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditClick(student)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Edit Student Profile"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteStudent(student.id || student.studentCode)
                        }
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        title="Delete Profile"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL SIDE DRAWER */}
      {isDrawerOpen && selectedStudent && (
        <>
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Side Panel */}
          <div className="fixed top-0 right-0 h-full w-[440px] bg-white border-l border-slate-100 shadow-2xl z-50 flex flex-col p-6 transition-all duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Modify Student Profile
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Update database properties safely
                </p>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Editing Form */}
            <form
              onSubmit={handleUpdateStudent}
              className="flex-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedStudent.name || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    required
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedStudent.gender || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Student Code */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Student Code
                  </label>
                  <input
                    type="text"
                    name="studentCode"
                    required
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedStudent.studentCode || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedStudent.email || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedStudent.phoneNumber || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedStudent.dateOfBirth || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Bottom Actions Drawer Panel */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3 mt-6">
                <button
                  type="button"
                  onClick={() =>
                    handleDeleteStudent(
                      selectedStudent.id || selectedStudent.studentCode,
                    )
                  }
                  className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition font-bold text-sm flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Student
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 text-slate-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    {actionLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
