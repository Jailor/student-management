import axios from 'axios';


const API_USER_URL = 'http://localhost:8080/user';

const UserService = {
    getAllUsers: function() {
        return axios.get(API_USER_URL);
    },

    getUserById: function(id) {
        return axios.get(`${API_USER_URL}/${id}`);
    },

    createUser: function(userData) {
        return axios.post(API_USER_URL, userData);
    },

    updateUser: function(id, userData) {
        return axios.put(`${API_USER_URL}/${id}`, userData);
    },

    deleteUser: function(id) {
        return axios.delete(`${API_USER_URL}/${id}`);
    }
};

export default UserService;
