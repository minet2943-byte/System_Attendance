import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Users,
  CheckCircle2,
  History,
  XCircle,
  Check,
  Clock,
  X,
  Save,
  Search,
  MessageSquare,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import attendanceSessionService from "../../services/attendanceSessionService";
import studentService from "../../services/studentService";
import attendanceService from "../../services/attendanceService";
import classService from "../../services/classService";

export default function MarkAttendance() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [classes, setClasses] = useState([]);
  const [classSection, setClassSection] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [activeRemarkId, setActiveRemarkId] = useState(null);
  const [selectedSessionId, setSelectedSessionId] = useState([]);

  // 1. Fetch available classes from Class API on component mount
  useEffect(() => {
    const loadClasses = async () => {
      try {
        const response = await classService.getClasses();
        const data = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : [];

        const standardizedClasses = data.map((cls) => ({
          id: cls.id,
          classTitle: cls.classTitle,
        }));

        setClasses(standardizedClasses);
      } catch (error) {
        console.error("API Error loading classes:", error);
      }
    };
    loadClasses();
  }, []);

  // 2. Dynamically fetch students when the selected class changes
  useEffect(() => {
    const loadStudents = async () => {
      // ពិនិត្យថាបានជ្រើស Class ឬនៅ
      if (!classSection) {
        setStudents([]);

        return;
      }

      try {
        const response = await studentService.getStudentsByClass(classSection);

        console.log("Class ID:", classSection);
        console.log("Response:", response?.data ?? response);

        const rawData = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.data?.data)
              ? response.data.data
              : [];

        const studentList = rawData.map((student) => ({
          id: student.id,
          name: student.name,
          gender: student.gender,
          status: "Absent",

          history: 0,

          remark: "",
        }));

        setStudents(studentList);
      } catch (error) {
        console.error("API Error loading students:", error);

        setStudents([]);
      }
    };

    loadStudents();
  }, [classSection]);

  // Summary Metrics calculations
  const totalStudents = students.length;
  const totalPresent = students.filter((s) => s.status === "Present").length;
  const totalLate = students.filter((s) => s.status === "Late").length;
  const totalAbsent = students.filter((s) => s.status === "Absent").length;

  const changeStatus = (id, status) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student,
      ),
    );
  };

  const handleRemarkChange = (id, remark) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, remark } : student,
      ),
    );
  };

  const markAllPresent = () => {
    setStudents((prev) =>
      prev.map((student) => ({ ...student, status: "Present" })),
    );
  };

  const saveAttendance = async () => {
    try {
      const sessionResponse = await attendanceSessionService.createSession({
        classId: Number(classSection),
        sessionDate: selectedDate,
        startAt: "08:00:00",
      });

      const sessionId = sessionResponse.id;

      // Parallel requests for better performance
      await Promise.all(
        students.map((student) =>
          attendanceService.saveAttendance({
            sessionId,
            studentId: student.id,
            status: student.status.toUpperCase(),
            remark: student.remark || "",
          }),
        ),
      );

      // Centered Success Modal
      Swal.fire({
        title: "Success!",
        text: "Attendance saved successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error(error);

      // Centered Error Modal
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Cannot save attendance.",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#d33",
      });
    }
  };
  // Safe search logic: Casts ID to String to avoid runtime .toLowerCase() crashes
  const filteredStudents = students.filter((student) => {
    const studentIdStr = student.id ? String(student.id) : "";
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      studentIdStr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] px-12 py-8 text-[#1e293b]">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#0f172a]">
            Mark Attendance
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review and record student attendance for today's session.
          </p>
        </div>

        {/* Configuration Dropdowns */}
        <div className="flex gap-4 items-center">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Class Section
            </label>
            <div className="relative">
              <select
                value={classSection}
                onChange={(e) => setClassSection(e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.classTitle}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Select Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 pl-4 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card
          title="Total Students"
          value={totalStudents}
          icon={<Users className="w-6 h-6 text-indigo-600" />}
          bgColor="bg-indigo-50"
        />
        <Card
          title="Present"
          value={totalPresent}
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
          bgColor="bg-emerald-50"
          highlightColor="text-emerald-500"
        />
        <Card
          title="Late"
          value={totalLate}
          icon={<History className="w-6 h-6 text-amber-600" />}
          bgColor="bg-amber-50"
          highlightColor="text-amber-500"
        />
        <Card
          title="Absent"
          value={totalAbsent}
          icon={<XCircle className="w-6 h-6 text-rose-600" />}
          bgColor="bg-rose-50"
          highlightColor="text-rose-500"
        />
      </div>

      {/* FILTER & ACTIONS BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="relative w-72">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              placeholder="Search by name or ID..."
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex bg-slate-100/80 p-1 rounded-xl gap-1">
            {["All", "Present", "Late", "Absent"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterStatus === status
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={markAllPresent}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 transition px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            Mark All Present
          </button>

          <button
            onClick={saveAttendance}
            className="bg-blue-600 hover:bg-blue-700 text-white transition px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save Attendance
          </button>
        </div>
      </div>

      {/* TABLE HEADER META */}
      <div className="flex justify-between items-center mb-4 px-1">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <SlidersHorizontal className="w-4 h-4" />
          Filtering by:{" "}
          <span className="text-slate-700">{filterStatus} Students</span>
        </div>
        <div className="text-xs font-semibold text-slate-400">
          Showing {filteredStudents.length} of {totalStudents} students
        </div>
      </div>

      {/* ATTENDANCE LIST TABLE */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
              <th className="py-4 px-6 text-left">Student Details</th>
              <th className="py-4 px-6 text-left w-[35%]">Attendance Status</th>
              <th className="py-4 px-6 text-center w-[25%]">History (30D)</th>
              <th className="py-4 px-6 text-center w-[10%]">Remarks</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 transition">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm border border-slate-200">
                      {getInitials(student.name)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">
                        {student.name}
                      </div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">
                        ID: {student.id}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div className="flex bg-slate-100/50 p-1 rounded-xl gap-1 w-max">
                    <StatusButton
                      type="Present"
                      active={student.status === "Present"}
                      onClick={() => changeStatus(student.id, "Present")}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      Present
                    </StatusButton>

                    <StatusButton
                      type="Late"
                      active={student.status === "Late"}
                      onClick={() => changeStatus(student.id, "Late")}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Late
                    </StatusButton>

                    <StatusButton
                      type="Absent"
                      active={student.status === "Absent"}
                      onClick={() => changeStatus(student.id, "Absent")}
                    >
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                      Absent
                    </StatusButton>
                  </div>
                </td>

                <td className="py-4 px-6 text-center">
                  <div className="inline-block w-48 text-left">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1.5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          student.history >= 80 ? "bg-blue-600" : "bg-rose-500"
                        }`}
                        style={{ width: `${student.history}%` }}
                      ></div>
                    </div>
                    <span
                      className={`text-[11px] font-bold block text-center ${
                        student.history >= 80
                          ? "text-blue-600"
                          : "text-rose-500"
                      }`}
                    >
                      {student.history}% Attendance
                    </span>
                  </div>
                </td>

                <td className="py-4 px-6 text-center">
                  <div className="relative flex justify-center items-center">
                    <button
                      onClick={() =>
                        setActiveRemarkId(
                          activeRemarkId === student.id ? null : student.id,
                        )
                      }
                      className={`${student.remark ? "text-blue-600" : "text-slate-400"} hover:text-slate-600 transition`}
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                    {activeRemarkId === student.id && (
                      <div className="absolute bottom-8 z-10 bg-slate-800 text-white text-xs rounded-lg p-2 shadow-lg flex gap-1 w-48">
                        <input
                          type="text"
                          placeholder="Add Note..."
                          value={student.remark || ""}
                          onChange={(e) =>
                            handleRemarkChange(student.id, e.target.value)
                          }
                          className="bg-slate-700 text-white rounded px-2 py-1 outline-none w-full"
                          autoFocus
                        />
                        <button
                          onClick={() => setActiveRemarkId(null)}
                          className="p-1 hover:bg-slate-700 rounded"
                        >
                          <Check className="w-3 h-3 text-emerald-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
  bgColor,
  highlightColor = "text-slate-800",
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-center">
      <div className={`${bgColor} p-3 rounded-2xl`}>{icon}</div>
      <div>
        <p className="text-slate-400 text-xs font-semibold tracking-wide uppercase">
          {title}
        </p>
        <h2 className={`text-2xl font-black mt-0.5 ${highlightColor}`}>
          {value}
        </h2>
      </div>
    </div>
  );
}

function StatusButton({ children, active, type, onClick }) {
  let activeStyles = "";
  if (active) {
    if (type === "Present")
      activeStyles = "bg-emerald-600 text-white shadow-sm";
    else if (type === "Late")
      activeStyles = "bg-amber-700 text-white shadow-sm";
    else if (type === "Absent")
      activeStyles = "bg-rose-600 text-white shadow-sm";
  } else {
    activeStyles = "text-slate-500 hover:text-slate-800";
  }

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all ${activeStyles}`}
    >
      {children}
    </button>
  );
}
