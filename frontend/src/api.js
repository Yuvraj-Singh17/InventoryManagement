import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Final Code format
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (data) => api.post('/auth/login', data),
  signup: (data) => api.post('/auth/signup', data),
};
// api for product 
export const productApi = {
  getAll: (page = 0, size = 10) => api.get(`/products?page=${page}&size=${size}`),
  search: (term, page = 0, size = 10) => api.get(`/products?search=${term}&page=${page}&size=${size}`),
  getLowStock: (threshold = 10) => api.get(`/products/low-stock?threshold=${threshold}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

export const dashboardApi = {
  // api is use for dashbopard//
  getSummary: () => api.get('/dashboard/summary'),
};

export const saleApi = {
  getAll: (page = 0, size = 10) => api.get(`/sales?page=${page}&size=${size}`),
  create: (data) => api.post('/sales', data),
};
// suppliers api
export const supplierApi = {
  getAll: (page = 0, size = 10) => api.get(`/suppliers?page=${page}&size=${size}`),
  create: (data) => api.post('/suppliers', data),
};

export default api;
