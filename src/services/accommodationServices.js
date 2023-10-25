import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/accommodation");
  },
  getAllForUser(userId) {
    return apiClient.get("/accommodation/userTut/" + userId);
  },
  get(id) {
    return apiClient.get(`/accommodation/${id}`);
  },
  create(data) {
    return apiClient.post("/accommodation", data);
  },
  update(id, data) {
    return apiClient.put(`/accommodation/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/accommodation/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/accommodation`);
  },
  findByTitle(title) {
    return apiClient.get(`/accommodation?title=${title}`);
  },
};
