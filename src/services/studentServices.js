import apiClient from "./services.js";

export default {
  getStudentIdByUserId(userId) {
    return apiClient.get("/student/" + userId);
  },
  getAll() {
    return apiClient.get("/student");
  },
};

