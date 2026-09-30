'use client'
import React from 'react'

const SampleButton: React.FC = () => {
  const handleClick = () => {
    alert('Sample Button Clicked!')
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={handleClick}
        type="button"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Sample Button
      </button>
    </div>
  )
}

export default SampleButton
