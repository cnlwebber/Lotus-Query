import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// makes requests to endpoints using axios api instance
// these functions will be attached/used in buttons like a login button/signup button etc.
export const fetchCards = () => api.get('/cards');
export const searchQuery = (query) => api.get('/cards/search', { params: { query } })
export const randomCard = () => api.get('/random')
export const scry = (scryfall_id) => api.get('/scry', { params: { scryfall_id } })
