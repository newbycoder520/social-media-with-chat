import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getUser = (userId) => API.get(`/users/${userId}`);
export const updateUser = (id, formData) =>  API.put(`/users/${id}`, formData);
export const getAllUser = ()=> API.get('/users')
export const followUser = (id,data)=> API.put(`/users/${id}/follow`, data)
export const unfollowUser = (id, data)=> API.put(`/users/${id}/unfollow`, data)