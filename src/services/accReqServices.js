import apiClient from "./services.js";

export default {
  getAll() {
    return apiClient.get("/accReq");
  },
  getAllForUser(userId) {
    return apiClient.get("/accReq/" + userId);
  },
  get(id) {
    return apiClient.get(`/accReq/${id}`);
  },
  create(data) {
    return apiClient.post("/accReq", data);
  },
  update(id, data) {
    return apiClient.put(`/accReq/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/accReq/${id}`);
  },
  deleteAll() {
    return apiClient.delete(`/accReq`);
  },
  // findByTitle(title) {
  //   return apiClient.get(`/accReq?title=${title}`);
  // },
};
