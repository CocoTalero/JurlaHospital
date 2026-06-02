import { useState } from 'react'
import { Plus, Search, LayoutGrid, List, ChevronDown, Calendar, Menu } from 'lucide-react'
import '../styles/DoctorSchedules.css'
import drSakilaImage from '../assets/dr. Sakila.jpeg'
import drTasyaImage from '../assets/dr. Tasya.jpeg'
import drElaImage from '../assets/dr. Ela.jpeg'
import drBasikalImage from 'src/assets/dr.Basikal.jpg'

// Generator untuk 300 dokter (4 original + 296 random)
const generateDoctorData = () => {
  // Data dokter original (id 1-4)
  const originalDoctors = [
    {
      id: 1,
      name: 'dr. Sakila',
      specialty: 'Psychiatrist',
      department: 'Psychiatrist',
      time: '09:00 AM - 02:00 PM',
      availability: 8,
      status: 'Available',
      avatarImage: drSakilaImage
    },
    {
      id: 2,
      name: 'dr. Natasya Aulia',
      specialty: 'Pediatrics',
      department: 'Pediatrics',
      time: '11:00 AM - 04:00 PM',
      availability: 14,
      status: 'On Break',
      avatarImage: drTasyaImage
    },
    {
      id: 3,
      name: 'dr. Ariella',
      specialty: 'Neurology Surgery',
      department: 'Neurology',
      time: '08:00 AM - 06:00 PM',
      availability: 0,
      status: 'In Surgery',
      avatarImage: drElaImage
    },
    {
      id: 4,
      name: 'dr. Basikal',
      specialty: 'Immunology',
      department: 'Immunology',
      time: '08:30 AM - 01:30 PM',
      availability: 22,
      status: 'Available',
      avatarImage: drBasikalImage
    }
  ]

  const firstNames = [
    'Robert', 'Sarah', 'John', 'Elliot',
    'Michael', 'Jennifer', 'David', 'Lisa', 'James', 'Patricia', 'William', 'Mary',
    'Richard', 'Karen', 'Thomas', 'Nancy', 'Charles', 'Betty', 'Christopher', 'Margaret',
    'Daniel', 'Sandra', 'Matthew', 'Barbara', 'Mark', 'Donna', 'Donald', 'Carol',
    'Steven', 'Ruth', 'Paul', 'Sharon', 'Andrew', 'Cynthia', 'Joshua', 'Kathleen',
    'Kenneth', 'Amy', 'Kevin', 'Angela', 'Brian', 'Melissa', 'George', 'Deborah',
    'Edward', 'Stephanie', 'Ronald', 'Rebecca', 'Timothy', 'Jason', 'Laura',
    'Jeffrey', 'Ryan', 'Jacob', 'Gary', 'Shirley'
  ]

  const lastNames = [
    'Reese', 'Reid', 'Chase', 'Dorian', 'Miller', 'Wilson', 'Moore',
    'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson',
    'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker',
    'Hall', 'Allen', 'Young', 'King', 'Wright', 'Scott', 'Torres', 'Peterson',
    'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Reeves', 'Stewart',
    'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan'
  ]

  const specialties = [
    'Cardiology', 'Pediatrics', 'Neurology', 'Immunology', 'Orthopedics',
    'General Medicine', 'Dermatology', 'Psychiatrist', 'Intensive Care',
    'Surgery', 'Ophthalmology', 'ENT', 'Urology', 'Gastroenterology',
    'Rheumatology', 'Oncology', 'Radiology', 'Pathology', 'Anesthesia',
    'Emergency Medicine', 'Internal Medicine', 'Neurosurgery', 'Cardiothoracic Surgery'
  ]

  const departments = [
    'Cardiology', 'Pediatrics', 'Neurology', 'Immunology', 'Orthopedics',
    'General Medicine', 'Dermatology', 'Psychiatrist', 'ICU', 'Surgery',
    'Ophthalmology', 'ENT', 'Urology', 'Gastroenterology'
  ]

  const statuses = ['Available', 'On Break', 'In Surgery', 'Off Duty']
  
  const colors = [
    '#6b7280', '#0891b2', '#059669', '#d97706', '#7c3aed',
    '#db2777', '#0284c7', '#16a34a', '#ea580c', '#4f46e5'
  ]

  const times = [
    '08:00 AM - 05:00 PM',
    '09:00 AM - 02:00 PM',
    '10:00 AM - 06:00 PM',
    '11:00 AM - 04:00 PM',
    '08:30 AM - 01:30 PM',
    'Tue, Thursday',
    'Mon, Wed, Fri',
    '07:00 AM - 03:00 PM'
  ]

  const doctors = [...originalDoctors]
  
  // Generate 296 dokter random untuk id 5-300
  for (let i = 5; i <= 30; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const specialty = specialties[Math.floor(Math.random() * specialties.length)]
    const department = departments[Math.floor(Math.random() * departments.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const time = times[Math.floor(Math.random() * times.length)]
    const availability = Math.floor(Math.random() * 25)
    const color = colors[Math.floor(Math.random() * colors.length)]
    const initials = firstName.charAt(0) + lastName.charAt(0)

    doctors.push({
      id: i,
      name: `dr. ${firstName} ${lastName}`,
      specialty: specialty,
      department: department,
      time: time,
      availability: availability,
      status: status,
      avatar: initials,
      color: color
    })
  }
  return doctors
}

const doctorData = generateDoctorData()

const departments = [
  'All Departments',
  'Cardiology',
  'Pediatrics',
  'Neurology',
  'Immunology',
  'ICU',
  'Orthopedics',
  'General Medicine',
  'Dermatology',
  'Psychiatrist'
]

const getStatusColor = (status) => {
  switch (status) {
    case 'Available':
      return '#10b981'
    case 'On Break':
      return '#f59e0b'
    case 'In Surgery':
      return '#ef4444'
    case 'Off Duty':
      return '#9ca3af'
    default:
      return '#6b7280'
  }
}

const getStatusBadge = (status) => {
  switch (status) {
    case 'Available':
      return 'available'
    case 'On Break':
      return 'on-break'
    case 'In Surgery':
      return 'in-surgery'
    case 'Off Duty':
      return 'off-duty'
    default:
      return 'default'
  }
}

export default function DoctorSchedules({ sidebarOpen, onToggleSidebar }) {
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDoctors = doctorData.filter(doctor => {
    const deptMatch = selectedDepartment === 'All Departments' || doctor.department === selectedDepartment
    const searchMatch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    return deptMatch && searchMatch
  })

  return (
    <div className="doctor-schedules">
      {/* Header */}
      <div className="schedules-header">
        <div className="header-content">
          <div className="header-left">
            <button className="hamburger-btn" onClick={onToggleSidebar} title="Toggle menu">
              <Menu size={24} />
            </button>
            <div className="header-title">
              <h1>Doctor Schedules</h1>
              <p>Welcome back, dr. Sakila</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-add-doctor">
              <Plus size={18} />
              Add Doctor
            </button>
            <Search size={24} className="search-icon" />
            <div className="user-profile">
              <div className="avatar" style={{ overflow: 'hidden' }}>
                <img src={drSakilaImage} alt="dr. Sakila" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="user-info">
                <p>dr. Sakila</p>
                <p>Head of Medical Records</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="schedules-content">
        {/* Filter and View Controls */}
        <div className="filter-controls">
          <div className="filter-section">
            <div className="filter-label">
              🔽 Filter by Polyclinic:
            </div>
            <select 
              className="department-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <LayoutGrid size={20} />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className={`doctors-container ${viewMode}`}>
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              {/* Doctor Image */}
              <div className="doctor-image-container">
                <div 
                  className="doctor-avatar"
                  style={{ background: doctor.color, overflow: 'hidden' }}
                >
                  {doctor.avatarImage ? (
                    <img src={doctor.avatarImage} alt={doctor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    doctor.avatar
                  )}
                </div>
                <div 
                  className="status-indicator"
                  style={{ background: getStatusColor(doctor.status) }}
                ></div>
              </div>

              {/* Status Badge */}
              <div className={`status-badge ${getStatusBadge(doctor.status)}`}>
                {doctor.status}
              </div>

              {/* Doctor Info */}
              <h3 className="doctor-name">{doctor.name}</h3>
              <p className="doctor-specialty">{doctor.specialty}</p>

              {/* Time Slot */}
              <div className="time-slot">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{doctor.time}</span>
              </div>

              {/* Availability */}
              <div className="availability-section">
                <label className="availability-label">AVAILABILITY</label>
                <div className="availability-count">
                  <span className="count">{doctor.availability}</span>
                  <span className="text">slots left</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="action-button">
                <Calendar size={18} />
              </button>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="no-results">
            <p>No doctors found for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
