import { useState, useEffect } from 'react'
import { Search, Filter, Download, MoreVertical, Plus, Menu, X } from 'lucide-react'
import '../styles/PatientRecords.css'
import drSakilaImage from '../assets/dr. Sakila.jpeg'
import csvData from '../assets/healthcare_patient_journey.csv?raw'
import { parseCSV, transformCSVToPatientData } from '../utils/csvParser'
import jsPDF from 'jspdf'

let patientData = []

const DEPARTMENTS = [
  'Cardiology',
  'Pediatrics',
  'Neurology',
  'Immunology',
  'Orthopedics',
  'General Medicine',
  'Dermatology',
  'Psychiatrist',
  'ICU'
]

const ROOM_CLASSES = ['Standard', 'Semi-Private', 'Private', 'ICU']
const PATIENT_TYPES = ['In-Patient', 'Out-Patient']
const INSURANCE_STATUSES = ['Active', 'Pending', 'Expired']

const getAvatarColor = (initials) => {
  const colors = ['#0284c7', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b']
  return colors[initials.charCodeAt(0) % colors.length]
}

const getStatusColor = (status) => {
  switch (status) {
    case 'In-Patient':
      return 'in-patient'
    case 'Out-Patient':
      return 'out-patient'
    case 'Expired':
      return 'expired'
    default:
      return 'default'
  }
}

const getInsuranceIcon = (insurance) => {
  switch (insurance) {
    case 'BlueCross':
      return '🛡️'
    case 'Medicare':
      return '🛡️'
    case 'Aetna':
      return '🛡️'
    case 'Private':
      return '🔒'
    case 'Expired':
      return '⚠️'
    default:
      return '📋'
  }
}

// Modal untuk Register Patient
function RegisterPatientModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    disease: '',
    department: 'Cardiology',
    admissionDate: '',
    dischargeDate: '',
    patientType: 'Out-Patient',
    roomClass: 'Standard',
    insuranceStatus: 'Active'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.patientName && formData.age && formData.disease && formData.admissionDate) {
      onSubmit(formData)
      setFormData({
        patientName: '',
        age: '',
        disease: '',
        department: 'Cardiology',
        admissionDate: '',
        dischargeDate: '',
        patientType: 'Out-Patient',
        roomClass: 'Standard',
        insuranceStatus: 'Active'
      })
    } else {
      alert('Please fill all required fields')
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Register Patient</h2>
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="patientName">Patient Name *</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="0"
                max="120"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="disease">Disease *</label>
              <input
                type="text"
                id="disease"
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                placeholder="Enter disease/condition"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="admissionDate">Admission Date *</label>
              <input
                type="date"
                id="admissionDate"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dischargeDate">Discharge Date</label>
              <input
                type="date"
                id="dischargeDate"
                name="dischargeDate"
                value={formData.dischargeDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientType">Patient Type *</label>
              <select
                id="patientType"
                name="patientType"
                value={formData.patientType}
                onChange={handleChange}
                required
              >
                {PATIENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="roomClass">Room Class *</label>
              <select
                id="roomClass"
                name="roomClass"
                value={formData.roomClass}
                onChange={handleChange}
                required
              >
                {ROOM_CLASSES.map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="insuranceStatus">Insurance Status *</label>
            <select
              id="insuranceStatus"
              name="insuranceStatus"
              value={formData.insuranceStatus}
              onChange={handleChange}
              required
            >
              {INSURANCE_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">Register Patient</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Modal untuk Filter
function FilterModal({ isOpen, onClose, onApply, currentFilters }) {
  const [filters, setFilters] = useState(currentFilters)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      department: '',
      patientType: '',
      insuranceStatus: '',
      ageMin: '',
      ageMax: ''
    })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content filter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Filter Patients</h2>
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="filter-form">
          <div className="form-group">
            <label htmlFor="filterDepartment">Department</label>
            <select
              id="filterDepartment"
              name="department"
              value={filters.department}
              onChange={handleChange}
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filterPatientType">Patient Type</label>
            <select
              id="filterPatientType"
              name="patientType"
              value={filters.patientType}
              onChange={handleChange}
            >
              <option value="">All Types</option>
              {PATIENT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filterInsurance">Insurance Status</label>
            <select
              id="filterInsurance"
              name="insuranceStatus"
              value={filters.insuranceStatus}
              onChange={handleChange}
            >
              <option value="">All Insurance</option>
              {INSURANCE_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ageMin">Min Age</label>
              <input
                type="number"
                id="ageMin"
                name="ageMin"
                value={filters.ageMin}
                onChange={handleChange}
                placeholder="Min"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ageMax">Max Age</label>
              <input
                type="number"
                id="ageMax"
                name="ageMax"
                value={filters.ageMax}
                onChange={handleChange}
                placeholder="Max"
                min="0"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={handleReset}>Reset</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Close</button>
            <button type="button" className="btn-submit" onClick={handleApply}>Apply Filter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PatientRecords({ sidebarOpen, onToggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [patients, setPatients] = useState([])
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filters, setFilters] = useState({
    department: '',
    patientType: '',
    insuranceStatus: '',
    ageMin: '',
    ageMax: ''
  })
  const itemsPerPage = 5

  useEffect(() => {
    // Parse CSV dan transform data
    const parsedData = parseCSV(csvData)
    const transformedData = transformCSVToPatientData(parsedData)
    setPatients(transformedData)
    patientData = transformedData
  }, [])

  // Handle register patient
  const handleRegisterPatient = (formData) => {
    const newPatient = {
      id: patients.length + 1,
      name: formData.patientName,
      gender: 'Unknown',
      age: parseInt(formData.age),
      medicalId: `#MED-${String(patients.length + 1).padStart(4, '0')}`,
      dob: `Age: ${formData.age}`,
      insurance: formData.insuranceStatus,
      status: formData.patientType,
      avatar: `P${patients.length + 1}`,
      department: formData.department,
      disease: formData.disease,
      admissionDate: formData.admissionDate,
      dischargeDate: formData.dischargeDate,
      roomClass: formData.roomClass,
      wait_time: 0,
      length_of_stay: 0,
      procedures: 0,
      medications: 0,
      cost: 0,
      satisfaction: 0
    }
    setPatients([newPatient, ...patients])
    setShowRegisterModal(false)
    alert('Patient registered successfully!')
  }

  // Handle apply filters
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  // Filter patients based on search and filters
  let filteredPatients = patients.filter(patient => {
    // Search filter
    const searchMatch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.medicalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.status.toLowerCase().includes(searchTerm.toLowerCase())

    // Department filter
    const deptMatch = !filters.department || patient.department === filters.department

    // Patient type filter
    const typeMatch = !filters.patientType || patient.status === filters.patientType

    // Insurance filter
    const insuranceMatch = !filters.insuranceStatus || patient.insurance === filters.insuranceStatus

    // Age range filter
    const ageMatch = (!filters.ageMin || patient.age >= parseInt(filters.ageMin)) &&
      (!filters.ageMax || patient.age <= parseInt(filters.ageMax))

    return searchMatch && deptMatch && typeMatch && insuranceMatch && ageMatch
  })

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const displayedPatients = filteredPatients.slice(startIdx, startIdx + itemsPerPage)

  // Generate pagination buttons with ellipsis
  const getPaginationButtons = () => {
    const buttons = []
    const maxVisible = 5
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, currentPage + 2)

    // Adjust range if near start
    if (currentPage <= 3) {
      endPage = Math.min(totalPages, maxVisible)
    }
    // Adjust range if near end
    if (currentPage > totalPages - 3) {
      startPage = Math.max(1, totalPages - maxVisible + 1)
    }

    // Add first page
    if (startPage > 1) {
      buttons.push(1)
      if (startPage > 2) {
        buttons.push('...')
      }
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i)
    }

    // Add last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push('...')
      }
      buttons.push(totalPages)
    }

    return buttons
  }

  // Export to PDF
  const handleExportPDF = () => {
    if (filteredPatients.length === 0) {
      alert('No patients to export')
      return
    }

    const doc = new jsPDF()
    const pageHeight = doc.internal.pageSize.height
    const pageWidth = doc.internal.pageSize.width
    let yPosition = 20

    // Title
    doc.setFontSize(18)
    doc.setFont(undefined, 'bold')
    doc.text('Patient Records Report', pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 10

    // Date
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 10

    // Summary
    doc.setFont(undefined, 'bold')
    doc.text(`Total Patients: ${filteredPatients.length}`, 20, yPosition)
    yPosition += 8

    // Table headers
    doc.setFont(undefined, 'bold')
    doc.setFontSize(9)
    const columns = ['Name', 'Age', 'Department', 'Type', 'Insurance', 'Status']
    const columnWidths = [35, 15, 30, 25, 25, 25]
    let xPosition = 20

    // Draw header row
    doc.setFillColor(41, 128, 185)
    doc.setTextColor(255, 255, 255)
    columns.forEach((col, idx) => {
      doc.text(col, xPosition, yPosition)
      xPosition += columnWidths[idx]
    })
    yPosition += 7

    // Draw patient rows
    doc.setTextColor(0, 0, 0)
    doc.setFont(undefined, 'normal')
    doc.setFontSize(8)

    filteredPatients.forEach((patient, idx) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage()
        yPosition = 20
      }

      xPosition = 20
      const row = [
        patient.name.substring(0, 15),
        patient.age.toString(),
        patient.department.substring(0, 12),
        patient.status.substring(0, 12),
        patient.insurance.substring(0, 12),
        'Active'
      ]

      row.forEach((cell, idx) => {
        doc.text(cell, xPosition, yPosition)
        xPosition += columnWidths[idx]
      })

      if (idx % 2 === 0) {
        doc.setFillColor(240, 240, 240)
        doc.rect(20, yPosition - 5, pageWidth - 40, 6, 'F')
      }

      yPosition += 7
    })

    // Footer
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text('Jurlah Hospital - Patient Management System', pageWidth / 2, pageHeight - 10, { align: 'center' })

    // Save
    doc.save(`patient-records-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const paginationButtons = getPaginationButtons()

  return (
    <div className="patient-records">
      {/* Header */}
      <div className="records-header">
        <div className="header-content">
          <div className="header-left">
            <button className="hamburger-btn" onClick={onToggleSidebar} title="Toggle menu">
              <Menu size={24} />
            </button>
            <div className="header-title">
              <h1>Patient Records</h1>
              <p>Welcome back, Sakila</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-register" onClick={() => setShowRegisterModal(true)}>
              <Plus size={18} />
              Register Patient
            </button>
            <Search size={32} className="search-icon" />
            <div className="user-profile">
              <div className="avatar" style={{ overflow: 'hidden' }}>
                <img src={drSakilaImage} alt="Sakila" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="user-info">
                <p>Sakila</p>
                <p>Head of Medical Records</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="records-content">
        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-box">
            <Search size={20} className="search-input-icon" />
            <input
              type="text"
              placeholder="Search by name, ID or status..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="search-input"
            />
          </div>
          <div className="filter-actions">
            <button className="btn-filter" onClick={() => setShowFilterModal(true)}>
              <Filter size={18} />
              Filter
            </button>
            <button className="btn-export" onClick={handleExportPDF}>
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="patients-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>MEDICAL ID</th>
                <th>DOB</th>
                <th>INSURANCE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {displayedPatients.map((patient) => (
                <tr key={patient.id} className="patient-row">
                  <td className="name-cell">
                    <div className="patient-info-cell">
                      <div className="avatar-small" style={{ background: getAvatarColor(patient.avatar) }}>
                        {patient.avatar}
                      </div>
                      <div>
                        <p className="patient-name">{patient.name}</p>
                        <p className="patient-meta">{patient.gender}, {patient.age}</p>
                      </div>
                    </div>
                  </td>
                  <td className="medical-id">{patient.medicalId}</td>
                  <td className="dob">{patient.dob}</td>
                  <td className="insurance">
                    <div className="insurance-info">
                      <span className="insurance-icon">{getInsuranceIcon(patient.insurance)}</span>
                      <span>{patient.insurance}</span>
                    </div>
                  </td>
                  <td className="status">
                    <span className={`status-badge ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="action">
                    <button className="btn-action">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <p className="pagination-info">Showing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filteredPatients.length)} of {filteredPatients.length} patients</p>
          <div className="pagination-controls">
            <button
              className="btn-pagination"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ←
            </button>
            {paginationButtons.map((button, index) => 
              button === '...' ? (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
              ) : (
                <button
                  key={button}
                  className={`btn-page ${currentPage === button ? 'active' : ''}`}
                  onClick={() => setCurrentPage(button)}
                >
                  {button}
                </button>
              )
            )}
            <button
              className="btn-pagination"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RegisterPatientModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)} 
        onSubmit={handleRegisterPatient}
      />
      
      <FilterModal 
        isOpen={showFilterModal} 
        onClose={() => setShowFilterModal(false)} 
        onApply={handleApplyFilters}
        currentFilters={filters}
      />
    </div>
  )
}
