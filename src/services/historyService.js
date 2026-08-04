import api from "./api";

const API_URL = "/attendance/report";

const historyService = {
  getAttendanceHistory: (classId, fromDate, toDate) => {
    return api.get("/attendance/report", {
      params: {
        classId,
        fromDate,
        toDate,
      },
    });
  },
};

export default historyService;
