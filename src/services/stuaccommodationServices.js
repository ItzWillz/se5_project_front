import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/accom");
  },
  getAllForUser(userId) {
    return apiClient.get("/accom/" + userId);
  },
  get(id) {
    return apiClient.get(`/accom/${id}`);
  },
  create(data) {
    return apiClient.post("/accom", data);
  },
  update(id, data) {
    return apiClient.put(`/accom/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/accom/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/accom`);
  },
  // findByTitle(title) {
  //   return apiClient.get(`/accReq?title=${title}`);
  // },
};
