import React, { useState, useEffect } from 'react'
import { runningAPI } from '../api'

function Running({ onDataChange }) {
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    loadWorkouts()
  }, [])

  const loadWorkouts = async () => {
    try {
      const res = await runningAPI.getAll()
      setWorkouts(res.data)
    } catch (error) {
      console.error('Error loading workouts:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!distance || !duration) return
    try {
      await runningAPI.create({
        distance_km: parseFloat(distance),
        duration_minutes: parseInt(duration)
      })
      setDistance('')
      setDuration('')
      await loadWorkouts()
      onDataChange()
    } catch (error) {
      console.error('Error saving workout:', error)
    }
  }

  return (
    <div>
      {/* Form Card */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{
          color: 'rgb(33, 32, 33)',
          fontSize: '20px',
          marginBottom: '20px',
          fontWeight: '600'
        }}>
          Новая пробежка
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                color: '#495057',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px'
              }}>
                Дистанция (км)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="0.0"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  color: '#212529',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgb(180, 162, 253)'}
                onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                color: '#495057',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '8px'
              }}>
                Время (минуты)
              </label>
              <input
                type="number"
                placeholder="0"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  color: '#212529',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgb(180, 162, 253)'}
                onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
              />
            </div>
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: 'rgb(180, 162, 253)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgb(160, 142, 233)'}
            onMouseLeave={(e) => e.target.style.background = 'rgb(180, 162, 253)'}
          >
            Сохранить тренировку
          </button>
        </form>
      </div>

      {/* History Table - адаптивная таблица */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{
          color: 'rgb(33, 32, 33)',
          fontSize: '18px',
          marginBottom: '16px',
          fontWeight: '600'
        }}>
          История тренировок
        </h3>
        <div style={{ 
          overflowX: 'auto', 
          WebkitOverflowScrolling: 'touch',
          margin: '0 -20px',
          padding: '0 20px'
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            minWidth: '500px'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e9ecef' }}>
                <th style={{ textAlign: 'left', padding: '10px 8px', color: '#6c757d', fontSize: '12px', fontWeight: '600' }}>Дата</th>
                <th style={{ textAlign: 'left', padding: '10px 8px', color: '#6c757d', fontSize: '12px', fontWeight: '600' }}>Дист.</th>
                <th style={{ textAlign: 'left', padding: '10px 8px', color: '#6c757d', fontSize: '12px', fontWeight: '600' }}>Время</th>
                <th style={{ textAlign: 'left', padding: '10px 8px', color: '#6c757d', fontSize: '12px', fontWeight: '600' }}>Очки</th>
                <th style={{ textAlign: 'left', padding: '10px 8px', color: '#6c757d', fontSize: '12px', fontWeight: '600' }}>Темп</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map(w => {
                const pace = (w.duration_minutes / w.distance_km).toFixed(1)
                return (
                  <tr key={w.id} style={{ borderBottom: '1px solid #f1f3f5' }}>
                    <td style={{ padding: '10px 8px', color: '#495057', fontSize: '13px' }}>
                      {new Date(w.date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })}
                    </td>
                    <td style={{ padding: '10px 8px', color: '#495057', fontSize: '13px' }}>
                      {w.distance_km}
                    </td>
                    <td style={{ padding: '10px 8px', color: '#495057', fontSize: '13px' }}>
                      {w.duration_minutes}
                    </td>
                    <td style={{ padding: '10px 8px' }}>
                      <span style={{
                        background: 'rgba(180, 162, 253, 0.1)',
                        color: 'rgb(180, 162, 253)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        +{w.points_earned}
                      </span>
                    </td>
                    <td style={{ padding: '10px 8px', color: '#6c757d', fontSize: '12px' }}>
                      {pace}
                    </td>
                  </tr>
                )
              })}
              {workouts.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#adb5bd' }}>
                    Нет тренировок
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Running