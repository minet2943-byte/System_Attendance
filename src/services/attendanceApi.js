import api from "./api";

const API_URL = "/attendance";

const attendanceApi = {
  saveAttendance(payload) {
    return api.post(API_URL, payload);
  },

  getAttendance() {
    return api.get(API_URL);
  },

  getMyAttendance(studentId) {
    return api.get(`${API_URL}/student/${studentId}`);
  },

  getReports(params) {
    return api.get(`${API_URL}/report`, {
      params: {
        classId: params.classId,
        fromDate: params.fromDate,
        toDate: params.toDate,
      },
    });
  },

  getAttendanceById(id) {
    return api.get(`${API_URL}/${id}`);
  },
  updateAttendance(id, payload) {
    return api.put(`${API_URL}/${id}`, payload);
  },

  deleteAttendance(id) {
    return api.delete(`${API_URL}/${id}`);
  },
};

export default attendanceApi;
