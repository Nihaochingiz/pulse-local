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
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{
          color: 'rgb(33, 32, 33)',
          fontSize: '24px',
          marginBottom: '24px',
          fontWeight: '600'
        }}>
          Новая пробежка
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
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
                  outline: 'none'
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
                  outline: 'none'
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

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{
          color: 'rgb(33, 32, 33)',
          fontSize: '20px',
          marginBottom: '24px',
          fontWeight: '600'
        }}>
          История тренировок
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e9ecef' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Дата</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Дистанция</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Время</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Очки</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Темп</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map(w => {
                const pace = (w.duration_minutes / w.distance_km).toFixed(1)
                return (
                  <tr key={w.id} style={{ borderBottom: '1px solid #f1f3f5' }}>
                    <td style={{ padding: '12px', color: '#495057', fontSize: '14px' }}>
                      {new Date(w.date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })}
                    </td>
                    <td style={{ padding: '12px', color: '#495057', fontSize: '14px' }}>
                      {w.distance_km} км
                    </td>
                    <td style={{ padding: '12px', color: '#495057', fontSize: '14px' }}>
                      {w.duration_minutes} мин
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        background: 'rgba(180, 162, 253, 0.1)',
                        color: 'rgb(180, 162, 253)',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        +{w.points_earned}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#6c757d', fontSize: '14px' }}>
                      {pace} мин/км
                    </td>
                  </tr>
                )
              })}
              {workouts.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#adb5bd' }}>
                    Нет тренировок. Начните первую пробежку!
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