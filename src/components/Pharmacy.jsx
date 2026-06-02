import { useState } from 'react'
import { Search, Filter, Plus, MoreVertical, Pill, Menu } from 'lucide-react'
import '../styles/Pharmacy.css'
import drSakilaImage from '../assets/dr. Sakila.jpeg'

const medicineData = [
  { id: 1, name: 'Amoxicillin 500mg', code: '#MED-0001', category: 'Antibiotics', expiry: 'Oct 12, 2024', stock: 12, stockLevel: 'Critical Low', percentage: 12 },
  { id: 2, name: 'Paracetamol 650mg', code: '#MED-1162', category: 'Pain Relief', expiry: 'Dec 09, 2025', stock: 420, stockLevel: 'Adequate', percentage: 85 },
  { id: 3, name: 'Metformin 1000mg', code: '#MED-2323', category: 'Diabetes Care', expiry: 'Jan 20, 2025', stock: 0, stockLevel: 'Fully Stocked', percentage: 100 },
  { id: 4, name: 'Atorvastatin 20mg', code: '#MED-0001', category: 'Cardiology', expiry: 'Nov 15, 2024', stock: 8, stockLevel: 'Restock Now', percentage: 18 },
  { id: 5, name: 'Ibuprofen Gel', code: '#MED-2361', category: 'Topical', expiry: 'Aug 01, 2026', stock: 250, stockLevel: 'Moderate', percentage: 45 },
  { id: 6, name: 'Aspirin 75mg', code: '#MED-0832', category: 'Blood Thinner', expiry: 'Sep 18, 2024', stock: 5, stockLevel: 'Critical Low', percentage: 8 },
]

const categories = ['All Categories', 'Antibiotics', 'Pain Relief', 'Diabetes Care', 'Cardiology', 'Topical', 'Blood Thinner']

const getStockStatusColor = (status) => {
  switch (status) {
    case 'Critical Low':
      return '#ef4444'
    case 'Restock Now':
      return '#f97316'
    case 'Adequate':
      return '#10b981'
    case 'Moderate':
      return '#f59e0b'
    case 'Fully Stocked':
      return '#06b6d4'
    default:
      return '#6b7280'
  }
}

const getStockStatusLabel = (status) => {
  switch (status) {
    case 'Critical Low':
      return 'Critical Low'
    case 'Restock Now':
      return 'Restock Now'
    case 'Adequate':
      return 'Adequate'
    case 'Moderate':
      return 'Moderate'
    case 'Fully Stocked':
      return 'Fully Stocked'
    default:
      return 'Unknown'
  }
}

export default function Pharmacy({ sidebarOpen, onToggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')

  const filteredMedicines = medicineData.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || medicine.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="pharmacy">
      {/* Header */}
      <div className="pharmacy-header">
        <div className="header-content">
          <div className="header-left">
            <button className="hamburger-btn" onClick={onToggleSidebar} title="Toggle menu">
              <Menu size={24} />
            </button>
            <div className="header-title">
              <h1>Pharmacy Inventory</h1>
              <p>Welcome back, Dr. House</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-add-medicine">
              <Plus size={18} />
              Add Medicine
            </button>
            <Search size={24} className="search-icon" />
            <div className="user-profile">
              <div className="avatar" style={{ overflow: 'hidden' }}>
                <img src={drSakilaImage} alt="Dr. House" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="user-info">
                <p>Dr. Gregory House</p>
                <p>Head of Diagnostics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pharmacy-content">
        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="filter-section">
            <Filter size={20} />
            <span>Filter by Category:</span>
          </div>
          <select 
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <Search size={20} className="search-input-icon" />
          <input
            type="text"
            placeholder="Search medicine name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Medicines Table */}
        <div className="medicines-table-container">
          <table className="medicines-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Category</th>
                <th>Expiry Date</th>
                <th>Stock Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map(medicine => (
                <tr key={medicine.id} className="medicine-row">
                  <td>
                    <div className="medicine-info">
                      <div className="medicine-icon">
                        <Pill size={18} />
                      </div>
                      <div>
                        <div className="medicine-name">{medicine.name}</div>
                        <div className="medicine-code">{medicine.code}</div>
                      </div>
                    </div>
                  </td>
                  <td>{medicine.category}</td>
                  <td>{medicine.expiry}</td>
                  <td>
                    <div className="stock-level">
                      <div className="stock-bar-container">
                        <div className="stock-bar">
                          <div 
                            className="stock-progress" 
                            style={{ 
                              width: `${medicine.percentage}%`,
                              backgroundColor: getStockStatusColor(medicine.stockLevel)
                            }}
                          ></div>
                        </div>
                        <span className="stock-text">{medicine.stock} boxes</span>
                      </div>
                      <div 
                        className="stock-status"
                        style={{ color: getStockStatusColor(medicine.stockLevel) }}
                      >
                        {getStockStatusLabel(medicine.stockLevel)}
                      </div>
                    </div>
                  </td>
                  <td>
                    <button className="action-btn">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
