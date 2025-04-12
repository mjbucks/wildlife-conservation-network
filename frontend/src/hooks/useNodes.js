import { useState, useEffect } from 'react';
import { nodeService } from '../services/api';

export function useNodes() {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      setLoading(true);
      const data = await nodeService.getAllNodes();
      setNodes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch nodes');
      console.error('Error fetching nodes:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateNodeStatus = async (nodeId, status) => {
    try {
      await nodeService.updateNodeStatus(nodeId, status);
      // Refresh nodes after update
      fetchNodes();
    } catch (err) {
      setError('Failed to update node status');
      console.error('Error updating node status:', err);
    }
  };

  return { nodes, loading, error, refreshNodes: fetchNodes, updateNodeStatus };
} 