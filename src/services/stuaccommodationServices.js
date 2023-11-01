import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/stucom");
  },
  getAllForUser(userId) {
    return apiClient.get(`/stucom/${userId}`);
  },
  get(id) {
    return apiClient.get(`/stucom/${id}`);
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
