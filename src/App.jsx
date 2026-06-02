import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import HealthcareDashboard from './components/HealthcareDashboard'
import PatientRecords from './components/PatientRecords'
import DoctorSchedules from './components/DoctorSchedules'
import Pharmacy from './components/Pharmacy'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <HealthcareDashboard sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      case 'patients':
        return <PatientRecords sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      case 'doctors':
        return <DoctorSchedules sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      case 'pharmacy':
        return <Pharmacy sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      default:
        return <HealthcareDashboard sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
    }
  }

  return (
    <div className="app-wrapper">
      <Sidebar isOpen={sidebarOpen} currentPage={currentPage} setCurrentPage={setCurrentPage} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
      {renderPage()}
    </div>
  )
}

export default App