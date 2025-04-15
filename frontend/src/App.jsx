import { useState, useEffect } from 'react'
import AlertsSidebar from './components/AlertsSidebar'
import MapView from './components/MapView'
import SensorPanel from './components/SensorPanel'
import AlertNotification from './components/AlertNotification'
import './styles/App.css'

function App() {
  const [alerts, setAlerts] = useState([])
  const [nodes, setNodes] = useState([])
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  // Fetch nodes data
  const fetchNodes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/nodes')
      if (!response.ok) {
        throw new Error('Failed to fetch nodes')
      }
      const data = await response.json()
      setNodes(data)
    } catch (error) {
      console.error('Error fetching nodes:', error)
    }
  }

  useEffect(() => {
    fetchNodes()
    // Set up polling every 30 seconds
    const interval = setInterval(fetchNodes, 30000)
    return () => clearInterval(interval)
  }, [])

  // Calculate network health stats
  const calculateNetworkStats = () => {
    if (!nodes.length) return { activeNodes: 0, totalNodes: 0, batteryAvg: 0, coverage: 0 }
    
    const activeNodes = nodes.filter(node => node.status === 'active').length
    const batterySum = nodes.reduce((sum, node) => sum + node.batteryLevel, 0)
    const batteryAvg = batterySum / nodes.length
    
    return {
      activeNodes,
      totalNodes: nodes.length,
      batteryAvg: Math.round(batteryAvg),
      coverage: Math.round((activeNodes / nodes.length) * 100)
    }
  }

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/alerts')
        if (!response.ok) {
          throw new Error('Failed to fetch alerts')
        }
        const data = await response.json()
        setAlerts(data)
      } catch (error) {
        console.error('Error fetching alerts:', error)
      }
    }

    fetchAlerts()
    // Set up polling every 30 seconds
    const interval = setInterval(fetchAlerts, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleAlertAction = async (alertId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/alerts/${alertId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update alert status')
      }

      setAlerts(alerts.map(alert => 
        alert._id === alertId ? { ...alert, status: newStatus } : alert
      ))
      setSelectedAlert(null)
      fetchAlerts()
    } catch (error) {
      console.error('Error updating alert:', error)
    }
  }

  const handleAlertSelect = (alert) => {
    setSelectedAlert(alert)
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>PPDS Ranger Dashboard</h1>
        <img src="/images/PPDS-logo-PNG.jpg" alt="PPDS Logo" className="logo" />
      </header>
      
      <div className="page-content">
        <AlertsSidebar alerts={alerts} onAlertSelect={handleAlertSelect} />
        <main className="main-content">
          <MapView nodes={nodes} />
        </main>
        <SensorPanel nodes={nodes} networkStats={calculateNetworkStats()} />
      </div>
      
      {selectedAlert && (
        <AlertNotification
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onAction={handleAlertAction}
        />
      )}
    </div>
  )
}

export default App
