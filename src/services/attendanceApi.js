import axios from "axios";

const API_URL = "http://localhost:8080/api/attendance";

const attendanceApi = {

    saveAttendance(payload) {
        return axios.post(API_URL, payload);
    },


    getAttendance() {
        return axios.get(API_URL);
    },


    getMyAttendance(studentId) {
        return axios.get(`${API_URL}/student/${studentId}`);
    },


    getReports(params) {

        return axios.get(`${API_URL}/report`, {
            params: {
                classId: params.classId,
                fromDate: params.fromDate,
                toDate: params.toDate
            }
        });

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

export default attendanceApi;