import axios from "axios";

const API_URL = "http://localhost:8080/api/attendance";

const attendanceService = {

    saveAttendance(payload) {
        return axios.post(API_URL, payload);
    },

    getAttendance() {
        return axios.get(API_URL);
    },

    getMyAttendance(studentId) {
    return axios.get(`${API_URL}/student/${studentId}`);
    },

    getAttendanceById(id) {
        return axios.get(`${API_URL}/${id}`);
    },

    updateAttendance(id, payload) {
        return axios.put(`${API_URL}/${id}`, payload);
    },

    deleteAttendance(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
    

};


export default attendanceService;