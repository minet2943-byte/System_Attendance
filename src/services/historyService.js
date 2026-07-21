// src/services/historyService.js
import api from "./api";

const historyService = {
  getAttendanceHistory: (classId, fromDate, toDate) => {
    return api.get("/attendance/history", {
      params: {
        classId,
        fromDate,
        toDate,
      },
    });
  },

  getClasses: () => {
    return api.get("/class");
  },
};

export default historyService;