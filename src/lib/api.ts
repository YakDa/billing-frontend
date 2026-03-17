import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Customers API
export const customersApi = {
  list: () => apiClient.get('/customers'),
  get: (id: string) => apiClient.get(`/customers/${id}`),
  create: (data: any) => apiClient.post('/customers', data),
  update: (id: string, data: any) => apiClient.put(`/customers/${id}`, data),
  delete: (id: string) => apiClient.delete(`/customers/${id}`),
};

// Subscriptions API
export const subscriptionsApi = {
  list: (params?: any) => apiClient.get('/subscriptions', { params }),
  get: (id: string) => apiClient.get(`/subscriptions/${id}`),
  create: (data: any) => apiClient.post('/subscriptions', data),
  update: (id: string, data: any) => apiClient.put(`/subscriptions/${id}`, data),
  cancel: (id: string) => apiClient.post(`/subscriptions/${id}/cancel`),
};

// Invoices API
export const invoicesApi = {
  list: (params?: any) => apiClient.get('/invoices', { params }),
  get: (id: string) => apiClient.get(`/invoices/${id}`),
  create: (data: any) => apiClient.post('/invoices', data),
  send: (id: string) => apiClient.post(`/invoices/${id}/send`),
};

// Usage API
export const usageApi = {
  getStats: () => apiClient.get('/usage/stats'),
  getByCustomer: (customerId: string) => apiClient.get(`/usage/customers/${customerId}`),
  getBySubscription: (subscriptionId: string) => apiClient.get(`/usage/subscriptions/${subscriptionId}`),
  getHistory: (params?: any) => apiClient.get('/usage/history', { params }),
};

// Dashboard API
export const dashboardApi = {
  getOverview: () => apiClient.get('/dashboard/overview'),
  getRevenue: (params?: any) => apiClient.get('/dashboard/revenue', { params }),
  getRecentActivity: () => apiClient.get('/dashboard/activity'),
};

export default apiClient;
