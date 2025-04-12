import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const nodeService = {
  getAllNodes: async () => {
    const response = await api.get('/nodes');
    return response.data;
  },

  getNodeById: async (nodeId) => {
    const response = await api.get(`/nodes/${nodeId}`);
    return response.data;
  },

  updateNodeStatus: async (nodeId, status) => {
    const response = await api.patch(`/nodes/${nodeId}`, { status });
    return response.data;
  },
};

export const alertService = {
  getAlerts: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/alerts?${params}`);
    return response.data;
  },

  updateAlertStatus: async (alertId, status) => {
    const response = await api.patch(`/alerts/${alertId}`, { status });
    return response.data;
  },
}; 