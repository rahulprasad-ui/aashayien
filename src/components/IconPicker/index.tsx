'use client'

import React, { useState, useEffect } from 'react'
import { useField } from '@payloadcms/ui'
import * as LucideIcons from 'lucide-react'
import './styles.css'

// Get all valid icon names
// We prefer using the 'icons' export if available to avoid picking up the base 'Icon' component
// which causes a crash if rendered without props (reading .map of undefined content)
const iconList = (LucideIcons as any).icons ? (LucideIcons as any).icons : LucideIcons

const iconNames = Object.keys(iconList).filter((name) => {
  // Filter out internal/utility exports if using top-level exports
  // Explicitly exclude 'Icon' to prevent crash
  return /^[A-Z]/.test(name) && name !== 'icons' && name !== 'createLucideIcon' && name !== 'Icon'
})

export default function IconPicker({ path, label, required, description }: any) {
  const { value, setValue } = useField<string>({ path })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredIcons, setFilteredIcons] = useState<string[]>([])

  useEffect(() => {
    setFilteredIcons(
      iconNames.filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }, [searchTerm])

  const handleIconSelect = (iconName: string) => {
    setValue(iconName)
    setIsModalOpen(false)
  }

  const SelectedIcon = value && (iconList as any)[value] ? (iconList as any)[value] : null

  return (
    <div className="icon-picker-field">
      <label className="field-label">
        {label}
        {required && <span className="required">*</span>}
      </label>

      <div className="icon-picker-trigger-container">
        <button type="button" className="icon-picker-trigger" onClick={() => setIsModalOpen(true)}>
          {SelectedIcon ? (
            <div className="selected-icon-preview">
              <SelectedIcon size={24} />
              <span>{value}</span>
            </div>
          ) : (
            <span className="placeholder">Select an icon...</span>
          )}
        </button>
        {value && (
          <button
            type="button"
            className="clear-icon-btn"
            onClick={() => setValue(null)}
            title="Clear icon"
          >
            <LucideIcons.X size={16} />
          </button>
        )}
      </div>

      {description && <div className="field-description">{description}</div>}

      {isModalOpen && (
        <div className="icon-picker-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="icon-picker-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Select Icon</h3>
              <button type="button" className="close-btn" onClick={() => setIsModalOpen(false)}>
                <LucideIcons.X size={20} />
              </button>
            </div>

            <div className="modal-search">
              <div className="search-input-wrapper">
                <LucideIcons.Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search icons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="icons-grid">
              {filteredIcons.length > 0 ? (
                filteredIcons.map((name) => {
                  const Icon = (iconList as any)[name]
                  return (
                    <button
                      key={name}
                      type="button"
                      className={`icon-item ${value === name ? 'active' : ''}`}
                      onClick={() => handleIconSelect(name)}
                      title={name}
                    >
                      <Icon size={24} />
                    </button>
                  )
                })
              ) : (
                <div className="no-results">No icons found</div>
              )}
            </div>

            <div className="modal-footer">
              <div className="results-count">Showing {filteredIcons.length} icons</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
