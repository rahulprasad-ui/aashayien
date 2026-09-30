'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import './index.scss'
import DashboardCleanup from './DashboardCleanup'

const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalEnrollments: 0,
    signUpsCount: 0,
    othersCount: 0,
  })

  const [tables, setTables] = useState({
    aiLeads: [],
    signUps: [],
    purchases: [],
    paymentDrops: [],
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        const timestamp = Date.now()
        // Fetch total enrollments
        const totalRes = await fetch(`/api/enrollments?limit=1&t=${timestamp}`, { cache: 'no-store' })
        const totalData = await totalRes.json()

        // Fetch events
        const fetchEvent = async (eventType: string) => {
          const res = await fetch(`/api/enrollments?where[eventType][equals]=${eventType}&sort=-logDate&limit=5&t=${timestamp}`, { cache: 'no-store' })
          return await res.json()
        }

        const aiLeadsData = await fetchEvent('AI_POWERED_LEADS')
        const signUpsData = await fetchEvent('USER_SIGNS_UP_ON_THE_APP')
        const purchasesData = await fetchEvent('USER_BUYS_COURSE')
        const paymentDropsData = await fetchEvent('USER_DROPS_FROM_PAYMENT_PAGE')

        if (isMounted) {
          setStats({
            totalEnrollments: totalData.totalDocs || 0,
            signUpsCount: signUpsData.totalDocs || 0,
            othersCount: (totalData.totalDocs || 0) - (signUpsData.totalDocs || 0),
          })

          setTables({
            aiLeads: aiLeadsData.docs || [],
            signUps: signUpsData.docs || [],
            purchases: purchasesData.docs || [],
            paymentDrops: paymentDropsData.docs || [],
          })
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        if (isMounted) setLoading(false)
      }
    }

    fetchData()
    
    // Auto-refresh every 30 seconds to make it completely live/dynamic
    const interval = setInterval(fetchData, 30000)
    
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  const renderTable = (title: string, docs: any[]) => (
    <div className="dashboard-stats__table-container">
      <h3>{title}</h3>
      <div className="table-wrapper">
        {docs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc: any) => (
                <tr key={doc.id}>
                  <td>{doc.name || 'N/A'}</td>
                  <td>{doc.phoneNumber || '-'}</td>
                  <td>{doc.courseName || '-'}</td>
                  <td>
                    {doc.logDate
                      ? new Date(doc.logDate).toLocaleDateString()
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No records found.</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="dashboard-stats">
      <DashboardCleanup />
      
      <div className="dashboard-stats__header">
        <h2>System Overview</h2>
        <p>Real-time enrollment tracking and user activity.</p>
        {loading && <span style={{ marginLeft: '10px', fontSize: '14px', color: '#888' }}>(Fetching live data...)</span>}
      </div>

      <div className="dashboard-stats__grid">
        <div className="dashboard-stats__card dashboard-stats__card--primary">
          <div className="card-header">
            <h3>Total Enrolled</h3>
            <span className="icon">👥</span>
          </div>
          <div className="value">{loading ? '...' : stats.totalEnrollments}</div>
          <div className="trend">Overall user base</div>
        </div>
        <div className="dashboard-stats__card dashboard-stats__card--success">
          <div className="card-header">
            <h3>Sign Ups</h3>
            <span className="icon">✨</span>
          </div>
          <div className="value">{loading ? '...' : stats.signUpsCount}</div>
          <div className="trend">New registrations</div>
        </div>
        <div className="dashboard-stats__card dashboard-stats__card--info">
          <div className="card-header">
            <h3>Other Events</h3>
            <span className="icon">📊</span>
          </div>
          <div className="value">{loading ? '...' : stats.othersCount}</div>
          <div className="trend">Interaction events</div>
        </div>
      </div>

      <div className="dashboard-stats__tables">
        <div className="tables-grid">
          <div className="dashboard-stats__quick-actions">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <Link href="/admin/collections/courses/create" className="action-btn">
                <span className="icon">📚</span>
                <span>New Course</span>
              </Link>
              <Link href="/admin/collections/media/create" className="action-btn">
                <span className="icon">🖼️</span>
                <span>Upload Media</span>
              </Link>
              <Link href="/admin/collections/posts/create" className="action-btn">
                <span className="icon">📝</span>
                <span>Create Post</span>
              </Link>
              <Link href="/admin/collections/users/create" className="action-btn">
                <span className="icon">👤</span>
                <span>Add User</span>
              </Link>
            </div>
          </div>
          {renderTable('Latest AI Powered Leads', tables.aiLeads)}
          {renderTable('Latest Sign Ups', tables.signUps)}
          {renderTable('Latest Course Purchases', tables.purchases)}
          {renderTable('Latest Payment Drops', tables.paymentDrops)}
        </div>
      </div>
    </div>
  )
}

export default DashboardStats
