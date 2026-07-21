import api from "./api";

const attendanceSessionService = {

    createSession: async (data) => {
        const response = await api.post(
            "/attendance-sessions",
            data
        );

        return response.data;
    }

};

export default attendanceSessionService;