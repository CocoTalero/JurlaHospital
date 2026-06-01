import { useState, useEffect } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Bell, Users, Heart, Star, Circle } from 'lucide-react'
import '../styles/HealthcareDashboard.css'
import drSakilaImage from '../assets/dr. Sakila.jpeg'
import csvData from '../assets/data_pasien.csv?raw'
import { parseCSV, calculateStats } from '../utils/csvParser'

export default function HealthcareDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalInpatients: 0,
    totalDoctors: 0,
    departments: 0,
    occupancyRate: 0,
    avgSatisfaction: 0,
    departmentPatientData: [],
    departmentData: [],
    admissionComparison: []
  })

  useEffect(() => {
    const parsedData = parseCSV(csvData)
    const calculatedStats = calculateStats(parsedData)
    setStats({
      ...calculatedStats,
      totalDoctors: 50,
      departments: 9
    })
  }, [])

  // Data untuk room/class occupancy
  const roomClasses = [
    { name: 'VVIP', current: 1, total: 5, color: '#eda32d', icon: 'star' },    
    { name: 'VIP', current: 2, total: 10, color: '#10b981', icon: 'star' },
    { name: 'Class 1', current: 6, total: 20, color: '#ef4444', icon: '1' },
    { name: 'Class 2', current: 10, total: 25, color: '#006aff', icon: '2' },
    { name: 'Class 3', current: 30, total: 40, color: '#8b5cf6', icon: '3' },
    { name: 'Class 4', current: 44, total: 50, color: '#6176ff', icon: '4' }    
  ]

  // Data untuk staff/dokter absent (mock data)
  const staffAbsent = [
    { id: 1, name: 'Jocelyn Saris', role: 'General Practitioner', status: 'ABSENT' },
    { id: 2, name: 'Ashlynn Herwitz', role: 'Radiologist', status: 'SICK' },
    { id: 3, name: 'Giana Dokidis', role: 'Nurse', status: 'ABSENT' },
    { id: 4, name: 'Ann Torff', role: 'Anesthesiologist', status: 'HOLIDAY' },
    { id: 5, name: 'Wilson Bothman', role: 'Pharmacist', status: 'SICK' }
  ]

  // Data untuk stacked bar chart (patient count)
  const patientCountData = [
    { name: 'Mon', 'Outpatient': 15, 'Inpatient': 9 },
    { name: 'Tue', 'Outpatient': 17, 'Inpatient': 5 },
    { name: 'Wed', 'Outpatient': 14, 'Inpatient': 13 },
    { name: 'Thu', 'Outpatient': 11, 'Inpatient': 8 },
    { name: 'Fri', 'Outpatient': 16, 'Inpatient': 11 },
    { name: 'Sat', 'Outpatient': 7, 'Inpatient': 6 },
    { name: 'Sun', 'Outpatient': 13, 'Inpatient': 5 }
  ]

  return (
    <div className="healthcare-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Dashboard Overview</h1>
            <p>Welcome back, dr. Sakila</p>
          </div>
          <div className="header-actions">
            <Bell size={24} className="notification-icon" />
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
      <div className="dashboard-content">
        
        {/* Top Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-value">{stats.totalPatients}</div>
            <div className="summary-label">Patients</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">{stats.totalDoctors}</div>
            <div className="summary-label">Doctors</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">{stats.departments}</div>
            <div className="summary-label">Departments</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">150</div>
            <div className="summary-label">Rooms</div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="main-grid">
          
          {/* Left Column */}
          <div className="grid-column left-column">
            {/* Patient Count Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Total Patients</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={patientCountData} margin={{ bottom: 0, top: 10, right: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} width={30} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Bar dataKey="Outpatient" stackId="a" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Inpatient" stackId="a" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="chart-legend">
                <span><span className="legend-color" style={{background: '#fbbf24'}}></span>Outpatient</span>
                <span><span className="legend-color" style={{background: '#7c3aed'}}></span>Inpatient</span>
              </div>
            </div>

            {/* Room Classes Occupancy */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Room Occupancy</h3>
              </div>
              <div className="room-classes">
                {roomClasses.map((room) => (
                  <div key={room.name} className="room-item">
                    <div className="room-header">
                      <div className="room-icon" style={{background: room.color}}>
                        {room.icon === 'star' ? (
                          <Star size={16} color="#fff" fill="#fff" />
                        ) : (
                          <span style={{color: '#fff', fontSize: '14px', fontWeight: 'bold'}}>{room.icon}</span>
                        )}
                      </div>
                      <span className="room-name">{room.name}</span>
                      <span className="room-count">{room.current}/{room.total} terisi</span>
                    </div>
                    <div className="room-progress">
                      <div className="progress-bar" style={{
                        background: room.color,
                        width: `${(room.current / room.total) * 100}%`
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="grid-column center-column">
            {/* Department Patients Pie Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Patients by Department</h3>
              </div>
              <ResponsiveContainer width="100%" height={259}>
                <PieChart>
                  <Pie
                    data={stats.departmentPatientData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="patients"
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    fontSize={14}
                  >
                    <Cell fill="#ef4444" />
                    <Cell fill="#8b5cf6" />
                    <Cell fill="#fbbf24" />
                    <Cell fill="#10b981" />
                    <Cell fill="#06b6d4" />
                    <Cell fill="#f97316" />
                    <Cell fill="#ec4899" />
                    <Cell fill="#6366f1" />
                    <Cell fill="#14b8a6" />
                  </Pie>
                  <Tooltip formatter={(value) => `${value} patients`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Doctors per Department */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Doctors by Department</h3>
              </div>
              <div className="doctor-list">
                {stats.departmentData && stats.departmentData.map((dept, idx) => (
                  <div key={idx} className="doctor-item">
                    <span className="doctor-role">{dept.name}</span>
                    <span className="doctor-count">{Math.ceil(dept.patients / 20)} doctors</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid-column right-column">
            {/* Row: status (left) + satisfaction (right) */}
            <div className="status-row">
              {/* Patient Status Indicator (left) */}
              <div className="status-indicator-card">
                <div className="status-indicator-circle">
                  <div className="status-indicator-value">76</div>
                  <div className="status-indicator-text">healthy patient</div>
                </div>
              </div>

              {/* Patient Satisfaction (right) */}
              <div className="satisfaction-card">
                <div className="satisfaction-circle">
                  <Heart size={40} color="#fff" fill="#fff" />
                  <div className="satisfaction-value">90%</div>
                  <div className="satisfaction-text">satisfied patient</div>
                </div>
              </div>
            </div>

            {/* Finance Info */}
            <div className="finance-card">
              <div className="finance-item">
                <div className="finance-label">Income</div>
                <div className="finance-value">Rp. 17.845</div>
                <div className="finance-change positive">▲</div>
              </div>
              <div className="finance-item">
                <div className="finance-label">Expenses</div>
                <div className="finance-value">Rp. 17.845</div>
                <div className="finance-change negative">▼</div>
              </div>
            </div>

            {/* Staff Absence Section */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Absent Staff</h3>
                <span className="absent-count">5</span>
              </div>
              <div className="staff-list">
                {staffAbsent.map((staff) => (
                  <div key={staff.id} className="staff-item">
                    <div className="staff-avatar">{staff.name.charAt(0)}</div>
                    <div className="staff-info">
                      <div className="staff-name">{staff.name}</div>
                      <div className="staff-role">{staff.role}</div>
                    </div>
                    <span className={`staff-status ${staff.status.toLowerCase()}`}>{staff.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
