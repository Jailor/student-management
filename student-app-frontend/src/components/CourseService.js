import axios from 'axios';

const API_URL = 'http://localhost:8080/course';

const CourseService = {
    getAllCourses: function() {
        return axios.get(API_URL);
    },

    getCourseById: function(id) {
        return axios.get(`${API_URL}/${id}`);
    },

    createCourse: function(courseData) {
        return axios.post(API_URL, courseData);
    },

    updateCourse: function(id, courseData) {
        return axios.put(`${API_URL}/${id}`, courseData);
    },

    deleteCourse: function(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
};

export default CourseService;