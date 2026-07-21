import axios from "axios";
import api from "./api";

const API_URL = "http://localhost:8080/api/students";

const studentService = {

    getAllStudents: () => {
        return axios.get(API_URL);
    },

    getMyProfile: async () => {
        const response = await api.get("/students/profile");
        return response.data;
    },

    getStudentsByClass: (id) => {
        return axios.get(`${API_URL}/class/${id}`);
    },

    createStudent: (data) => {
        return axios.post(API_URL, data);
    },

    updateStudent: (id, data) => {
        return axios.put(`${API_URL}/${id}`, data);
    },

    deleteStudent: (id) => {
        return axios.delete(`${API_URL}/${id}`);
    }

};

export default studentService;