import axios from 'axios';

const API_URL = 'http://localhost:8080/student';

const StudentService = {
    getAllStudents: function() {
        return axios.get(API_URL);
    },

    getStudentById: function(id) {
        return axios.get(`${API_URL}/${id}`);
    },

    createStudent: function(studentData) {
        return axios.post(API_URL, studentData);
    },

    updateStudent: function(id, studentData) {
        return axios.put(`${API_URL}/${id}`, studentData);
    },

    deleteStudent: function(id) {
        return axios.delete(`${API_URL}/${id}`);
    },

    getProjectedStudents: function() {
        return axios.get(`${API_URL}/projected`);
    },
    getStudentsByStatus: function(status) {
        return axios.get(`${API_URL}/status/${status}`);
    }
    ,
    getStudentCountByStatus: function() {
        return axios.get(`${API_URL}/countByStatus`);
    }

};

export default StudentService;