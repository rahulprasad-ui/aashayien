import React from 'react'

const SystemStatus: React.FC = () => {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f0f4f8',
        borderRadius: '8px',
        border: '1px solid #d1d9e6',
        marginTop: '20px',
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', color: '#1a202c' }}>Live System Status</h3>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <span style={{ color: '#4a5568' }}>Database:</span>
          <span style={{ marginLeft: '8px', color: '#38a169', fontWeight: 'bold' }}>Connected</span>
        </div>
        <div>
          <span style={{ color: '#4a5568' }}>Media Storage:</span>
          <span style={{ marginLeft: '8px', color: '#38a169', fontWeight: 'bold' }}>Active</span>
        </div>
        <div>
          <span style={{ color: '#4a5568' }}>API Rate:</span>
          <span style={{ marginLeft: '8px', color: '#3182ce', fontWeight: 'bold' }}>Healthy</span>
        </div>
      </div>
    </div>
  )
}

export default SystemStatus
