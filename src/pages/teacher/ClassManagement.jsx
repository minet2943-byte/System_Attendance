import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  GraduationCap,
  Users,
  MapPin,
  Clock,
  BarChart3,
  Pencil,
  Trash2,
  PlusCircle,
  ClipboardCheck,
} from "lucide-react";

import CreateClassModal from "../../components/CreateClassModal";
import CreateStudentModal from "../../components/CreateStudentModal";

import classService from "../../services/classService";
import studentService from "../../services/studentService";
import enrollService from "../../services/enrollService";
import { useAuth } from "../../context/AuthContext";

export default function ClassManagement() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // ===============================
  // States
  // ===============================
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create / Edit Class Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  // Add Student Modal
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  // ===============================
  // API Calls & Data Fetching
  // ===============================
  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await classService.getClasses();

      const items = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      const data = items.map((item) => ({
        id: item.id,
        code: item.classCode,
        title: item.classTitle,
        room: item.classRoom,
        schedule: item.schedule,
        students: item.studentCount || 0,
        attendance: "0%",
        health: "New",
        progress: 0,
        description: item.description,
        teacherId: item.teacherId,
        teacherName: item.teacherName,
      }));

      setClassList(data);
    } catch (err) {
      console.error("Error loading classes:", err);
      setError("Cannot load classes from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // ===============================
  // Class Modal Actions
  // ===============================
  const openCreateModal = () => {
    setEditingClass(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cls) => {
    setEditingClass(cls);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClass(null);
  };

  const handleSubmitClass = async (data) => {
    try {
      if (editingClass) {
        await classService.updateClass(editingClass.id, data);
        alert("Class updated successfully");
      } else {
        await classService.createClass(data);
        alert("Class created successfully");
      }
      closeModal();
      fetchClasses();
    } catch (err) {
      console.error("Failed to submit class:", err);
      alert("Operation failed");
    }
  };

  const handleDeleteClass = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?",
    );
    if (!confirmDelete) return;

    try {
      await classService.deleteClass(id);
      alert("Deleted successfully");
      fetchClasses();
    } catch (err) {
      console.error("Failed to delete class:", err);
      alert("Delete failed");
    }
  };

  // ===============================
  // Student & Navigation Handlers
  // ===============================
  const handleOpenStudentRegistration = (cls) => {
    setSelectedClassId(cls.id);
    setIsStudentModalOpen(true);
  };

  const handleSubmitStudent = async (student) => {
    try {
      const createdStudent = await studentService.createStudent({
        ...student,
        teacherId: user?.id,
      });

      const studentId = createdStudent?.id ?? createdStudent?.data?.id;
      if (!studentId) {
        throw new Error("Student creation succeeded but returned no ID");
      }

      await enrollService.createEnroll({
        studentId,
        classId: selectedClassId,
      });

      alert("Student created successfully");
      setIsStudentModalOpen(false);
      fetchClasses();
    } catch (err) {
      console.error(
        "Failed to create student:",
        err.response?.data || err.message,
      );
      alert("Create student failed");
    }
  };

  const handleGoToAttendance = (cls) => {
    navigate("/teacher/mark-attendance", {
      state: { selectedClass: cls },
    });
  };

  // ===============================
  // Computed Statistics
  // ===============================
  const totalStudents = classList.reduce((sum, cls) => sum + cls.students, 0);

  const stats = [
    {
      label: "ACTIVE CLASSES",
      value: classList.length,
      icon: GraduationCap,
    },
    {
      label: "TOTAL STUDENTS",
      value: totalStudents,
      icon: Users,
    },
    {
      label: "AVG ATTENDANCE",
      value: "94.2%",
      icon: BarChart3,
    },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#fafbfe] font-sans text-[#1e293b]">
      <main className="p-8 max-w-[1400px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0f172a]">
              Class Management
            </h2>
            <p className="text-[15px] text-slate-500 mt-1">
              Manage your active semesters and student groups.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-[#0052cc] hover:bg-[#0043a8] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create New Class
          </button>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="text-center py-10 text-slate-500 font-medium">
            Loading classes...
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl font-medium">
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {stat.value}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Class Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classList.map((cls) => (
            <div
              key={cls.id}
              className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                {/* Code & Actions */}
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold">
                    {cls.code}
                  </span>

                  <div className="flex gap-3">
                    <button
                      onClick={() => openEditModal(cls)}
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                      title="Edit Class"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteClass(cls.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete Class"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900">
                  {cls.title}
                </h3>

                {/* Information List */}
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {cls.room}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {cls.schedule}
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    {cls.students} Students
                  </div>

                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span className="text-blue-600 font-bold">
                      {cls.attendance} Attendance
                    </span>
                  </div>
                </div>

                {/* Attendance Progress */}
                <div className="pt-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Attendance Health</span>
                    <span className="text-green-600">{cls.health}</span>
                  </div>

                  <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${cls.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 flex flex-col gap-2">
                <button
                  onClick={() => handleOpenStudentRegistration(cls)}
                  className="w-full py-2.5 border-2 border-blue-100 hover:border-blue-300 text-blue-600 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Students
                </button>

                <button
                  onClick={() => handleGoToAttendance(cls)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  Mark Attendance
                </button>
              </div>
            </div>
          ))}

          {/* Add New Class Card */}
          <div
            onClick={openCreateModal}
            className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl min-h-[340px] flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-blue-50/30 transition-all p-6 text-center"
          >
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <PlusCircle className="w-8 h-8 text-blue-600" />
            </div>

            <h4 className="font-bold text-slate-800">Add New Group</h4>

            <p className="text-xs text-slate-400 mt-2 max-w-[200px]">
              Initialize a new classroom or student group.
            </p>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateClassModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmitClass}
        initialData={editingClass}
        mode={editingClass ? "edit" : "create"}
      />

      <CreateStudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSubmit={handleSubmitStudent}
        classes={classList}
        selectedClassId={selectedClassId}
      />
    </div>
  );
}
