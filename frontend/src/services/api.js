import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL  });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userInfo')).token
    }`;
  }
  return req;
});

// User API calls
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);

// Incident API calls
export const createIncident = (incidentData) => API.post('/incidents', incidentData);
export const getMyIncidents = () => API.get('/incidents');
export const getIncidentDetails = (id) => API.get(`/incidents/${id}`);
export const updateIncident = (id, updatedData) => API.put(`/incidents/${id}`, updatedData);