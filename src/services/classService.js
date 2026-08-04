import api from "./api";

const classService = {
  getClasses: async () => {
    try {
      const response = await api.get("/teacher/class");
      return response.data ?? response;
    } catch (error) {
      if (error.response?.status === 403) {
        const response = await api.get("/class");
        return response.data ?? response;
      }
      throw error;
    }
  },

  getClassById: async (id) => {
    try {
      const response = await api.get(`/teacher/class/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const response = await api.get(`/class/${id}`);
        return response.data;
      }
      throw error;
    }
  },

  createClass: async (data) => {
    try {
      const response = await api.post("/teacher/class", data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const response = await api.post("/class", data);
        return response.data;
      }
      throw error;
    }
  },

  updateClass: async (id, data) => {
    try {
      const response = await api.put(`/teacher/class/${id}`, data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const response = await api.put(`/class/${id}`, data);
        return response.data;
      }
      throw error;
    }
  },

  deleteClass: async (id) => {
    try {
      const response = await api.delete(`/teacher/class/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const response = await api.delete(`/class/${id}`);
        return response.data;
      }
      throw error;
    }
  },
};

export default classService;
