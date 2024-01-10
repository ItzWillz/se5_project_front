import apiClient from "./services.js";

export default {
    getFacultyIdByUserId(userId) {
        return apiClient.get("/faculty/" + userId);
    },
    getAllStudentsForFaculty(facultyId) {
        return apiClient.get("/faculty/students/" + facultyId);
    },
    getAllAccommodationsForStudent(studentId) {
        return apiClient.get("/faculty/student/" + studentId);
    },
};