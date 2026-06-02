import { useState, useEffect } from 'react'
import './App.css'
import './responsive-global.css'   // ← tambahkan ini
import Sidebar from './components/Sidebar'
import HealthcareDashboard from './components/HealthcareDashboard'
import PatientRecords from './components/PatientRecords'
import DoctorSchedules from './components/DoctorSchedules'
import Pharmacy from './components/Pharmacy'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769)
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 769)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 769
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      <Sidebar
        isOpen={sidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onClose={() => setSidebarOpen(false)}
      />
      {isMobile && (
        <div
          className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {renderPage()}
    </div>
  )
}

export default App
