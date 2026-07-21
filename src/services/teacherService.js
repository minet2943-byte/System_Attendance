import axios from "axios";

const API_URL = "http://localhost:8080/api/teacher";

const getProfile = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const response = await axios.get(
    `${API_URL}/profile?email=${user.email}`
  );

  return response.data;
};

export default {
  getProfile,
};