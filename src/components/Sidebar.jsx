import { LayoutGrid, Users, Stethoscope, Pill, Settings, X } from 'lucide-react'
import '../styles/Sidebar.css'

export default function Sidebar({ isOpen, currentPage, setCurrentPage, onClose }) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'patients', icon: Users, label: 'Patients' },
    { id: 'doctors', icon: Stethoscope, label: 'Doctors' },
    { id: 'pharmacy', icon: Pill, label: 'Pharmacy' },
  ]

  const handleMenuClick = (id) => {
    setCurrentPage(id)
    // Close sidebar on mobile after selecting menu
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Pill size={24} />
          <span>Jurla Hospital</span>
        </div>
        <button className="sidebar-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <div className="sidebar-content">
        <div className="menu-section">
          <div className="menu-title">MAIN</div>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="menu-section">
          <div className="menu-title">SYSTEM</div>
          <div className="menu-item">
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </div>
      </div>
    </div>
  )
}