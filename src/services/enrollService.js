import api from "./api";

const createEnroll = (data) => {
  return api.post("/enroll", data);
};

export default {
  createEnroll,
};
