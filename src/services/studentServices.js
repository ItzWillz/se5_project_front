import apiClient from "./services.js";

export default {
  getStudentIdByUserId(userId) {
    return apiClient.get("/student/" + userId);
  },
  getAll() {
    return apiClient.get("/student");
  },
  getStudentByStudentId(stuId) {
    return apiClient.get("/student/std/" + stuId);
  },
};

