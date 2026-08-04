import api from "./api";

const studentService = {
  getAllStudents: async () => {
    const response = await api.get("/students");
    return response.data ?? response;
  },

  getStudentsByClass: async (classId) => {
    const response = await api.get(`/students/class/${classId}`);

    return response.data ?? response;
  },

  getMyProfile: async () => {
    const response = await api.get("/students/profile");
    return response.data ?? response;
  },

  getStudentProfile: async () => {
    return studentService.getMyProfile();
  },

  createStudent: async (data) => {
    const response = await api.post("/students", data);

    return response.data;
  },

  updateStudent: async (id, data) => {
    const response = await api.put(`/students/${id}`, data);

    return response.data;
  },

  deleteStudent: async (id) => {
    const response = await api.delete(`/students/${id}`);

    return response.data;
  },
};

export default studentService;
