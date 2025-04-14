import { useState } from 'react'
import AlertsSidebar from './components/AlertsSidebar'
import MapView from './components/MapView'
import SensorPanel from './components/SensorPanel'
import AlertNotification from './components/AlertNotification'
import './styles/App.css'

function App() {
  // State for managing alerts and sensor data
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'gunshot',
      time: '2 mins ago',
      location: 'Node #12',
      confidence: '95%',
      status: 'unacknowledged'
    },
    {
      id: 2,
      type: 'chainsaw',
      time: '15 mins ago',
      location: 'Node #8',
      confidence: '88%',
      status: 'unacknowledged'
    },
    {
      id: 3,
      type: 'vehicle',
      time: '30 mins ago',
      location: 'Node #5',
      confidence: '92%',
      status: 'unacknowledged'
    },
    {
      id: 4,
      type: 'human',
      time: '45 mins ago',
      location: 'Node #3',
      confidence: '85%',
      status: 'unacknowledged'
    }
  ])
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  const handleAlertAction = (alertId, newStatus) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ))
    setSelectedAlert(null) // Close the popup
  }

  return (
    <div className="dashboard">
      {/* Header with system status and quick actions */}
      <header className="dashboard-header">
        <h1>PPDS Ranger Dashboard</h1>
        <div className="system-status">
          <span className="status-indicator active"></span>
          <span>System Status: Active</span>
        </div>
      </header>

      <main className="dashboard-content">
        <AlertsSidebar 
          alerts={alerts}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          setSelectedAlert={setSelectedAlert}
        />
        <MapView />
        <SensorPanel />
      </main>

      <AlertNotification 
        alert={selectedAlert}
        onAction={handleAlertAction}
      />
    </div>
  )
}

export default App
