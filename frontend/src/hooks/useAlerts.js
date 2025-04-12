import { useState, useEffect } from 'react';
import { alertService } from '../services/api';

export function useAlerts(initialFilters = {}) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    fetchAlerts();
  }, [filters]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await alertService.getAlerts(filters);
      setAlerts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch alerts');
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateAlertStatus = async (alertId, status) => {
    try {
      await alertService.updateAlertStatus(alertId, status);
      // Refresh alerts after update
      fetchAlerts();
    } catch (err) {
      setError('Failed to update alert status');
      console.error('Error updating alert status:', err);
    }
  };

  return {
    alerts,
    loading,
    error,
    setFilters,
    refreshAlerts: fetchAlerts,
    updateAlertStatus,
  };
} 