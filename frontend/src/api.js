import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// makes requests to endpoints using axios api instance
// these functions will be attached/used in buttons like a login button/signup button etc.
export const fetchCards = () => api.get('/cards');
export const loginUser = (credentials) => api.post('/login', credentials);
export const signupUser = (data) => api.post('/signup', data);
export const searchQuery = (query) => api.post('/')