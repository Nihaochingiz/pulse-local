import React, { useState, useEffect } from 'react'
import Running from './components/Running'
import Pushups from './components/Pushups'
import Meals from './components/Meals'
import PointsGame from './components/PointsGame'
import { pointsAPI } from './api'

function App() {
  const [activeTab, setActiveTab] = useState('running')
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    loadPoints()
  }, [])

  const loadPoints = async () => {
    try {
      const res = await pointsAPI.get()
      setTotalPoints(res.data.total_points)
    } catch (error) {
      console.error('Error loading points:', error)
    }
  }

  const updatePoints = async () => {
    await loadPoints()
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8f9fa',
      padding: '0',
      margin: '0'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e9ecef',
        padding: '20px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ 
            margin: 0, 
            color: 'rgb(33, 32, 33)',
            fontSize: '28px',
            fontWeight: '700',
            letterSpacing: '-0.5px'
          }}>
            PULSE
          </h1>
          <div style={{
            background: 'rgba(180, 162, 253, 0.1)',
            padding: '10px 20px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ color: 'rgb(33, 32, 33)', fontSize: '24px', fontWeight: 'bold' }}>
              {totalPoints}
            </span>
            <span style={{ color: 'rgb(180, 162, 253)', fontSize: '14px', fontWeight: '500' }}>очков</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        background: 'white',
        padding: '0 40px',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '0' }}>
          {[
            { id: 'running', label: 'Бег' },
            { id: 'pushups', label: 'Отжимания' },
            { id: 'meals', label: 'Питание' },
            { id: 'game', label: 'Награды' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 32px',
                background: 'transparent',
                color: activeTab === tab.id ? 'rgb(180, 162, 253)' : '#6c757d',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid rgb(180, 162, 253)' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px' }}>
        {activeTab === 'running' && <Running onDataChange={updatePoints} />}
        {activeTab === 'pushups' && <Pushups onDataChange={updatePoints} />}
        {activeTab === 'meals' && <Meals onDataChange={updatePoints} />}
        {activeTab === 'game' && <PointsGame points={totalPoints} onSpend={updatePoints} />}
      </div>
    </div>
  )
}

export default App