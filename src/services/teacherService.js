import api from "./api";

const API_URL = "/teacher";

const getProfile = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const response = await api.get(`${API_URL}/profile`, {
    params: { email: user?.email },
  });

  return response.data;
};

export default {
  getProfile,
};
