import axios from "axios";

const API_URL = "http://localhost:8080/api/class";

const classService = {

    getClasses: () => {
        return axios.get(API_URL);
    },

    getClassById: (id) => {
        return axios.get(`${API_URL}/${id}`);
    },

    createClass: (data) => {
        return axios.post(API_URL, data);
    },

    updateClass: (id, data) => {
        return axios.put(`${API_URL}/${id}`, data);
    },

    deleteClass: (id) => {
        return axios.delete(`${API_URL}/${id}`);
    }

};

export default classService;