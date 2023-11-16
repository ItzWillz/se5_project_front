import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/stucom");
  },
  getAllForUser(userId) {
    return apiClient.get(`/stucom/${userId}`);
  },
  getAllAcademic(userId, int, int1) {
    return apiClient.get(`/stucom/${userId}/${int}/${int1}`);
  },
  get(id, stuid) {
    return apiClient.get(`/stucom/${id}/${stuid}`);
  },
  create(data) {
    return apiClient.post("/stucom", data);
  },
  update(id, data) {
    return apiClient.put(`/stucom/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/stucom/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/stucom`);
  },
  // findByTitle(title) {
  //   return apiClient.get(`/accReq?title=${title}`);
  // },
};
