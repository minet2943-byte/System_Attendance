import api from "./api";

const API_URL = "/attendance";

const attendanceService = {
  saveAttendance(payload) {
    return api.post(API_URL, payload);
  },

  getAttendance() {
    return api.get(API_URL);
  },

  getMyAttendance(studentId) {
    // ✅ Prevent sending 'undefined' to the backend
    if (!studentId) {
      return Promise.reject(
        new Error("Student ID is required to fetch attendance."),
      );
    }
    return api.get(`${API_URL}/student/${studentId}`);
  },

  getAttendanceById(id) {
    if (!id) return Promise.reject(new Error("ID is required."));
    return api.get(`${API_URL}/${id}`);
  },

  updateAttendance(id, payload) {
    return api.put(`${API_URL}/${id}`, payload);
  },

  deleteAttendance(id) {
    return api.delete(`${API_URL}/${id}`);
  },
};

export default attendanceService;
