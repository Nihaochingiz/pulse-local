import React, { useState, useEffect } from 'react'
import { mealsAPI } from '../api'

function Meals({ onDataChange }) {
  const [mealName, setMealName] = useState('')
  const [isHealthy, setIsHealthy] = useState(true)
  const [meals, setMeals] = useState([])

  useEffect(() => {
    loadMeals()
  }, [])

  const loadMeals = async () => {
    try {
      const res = await mealsAPI.getAll()
      setMeals(res.data)
    } catch (error) {
      console.error('Error loading meals:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!mealName) return
    try {
      await mealsAPI.create({
        meal_name: mealName,
        calories: 0,  // Отправляем 0, так как поле обязательно в API
        is_healthy: isHealthy
      })
      setMealName('')
      setIsHealthy(true)
      await loadMeals()
      onDataChange()
    } catch (error) {
      console.error('Error saving meal:', error)
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
          Запись приема пищи
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#495057',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              Название блюда
            </label>
            <input
              type="text"
              placeholder="Например: Куриный салат"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
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
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={isHealthy}
                onChange={(e) => setIsHealthy(e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  accentColor: 'rgb(180, 162, 253)'
                }}
              />
              <span style={{ color: '#495057', fontSize: '14px', fontWeight: '500' }}>
                Полезная еда
              </span>
            </label>
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
            Сохранить
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
          История питания
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e9ecef' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Дата</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Блюдо</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Тип</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6c757d', fontSize: '14px', fontWeight: '600' }}>Очки</th>
              </tr>
            </thead>
            <tbody>
              {meals.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid #f1f3f5' }}>
                  <td style={{ padding: '12px', color: '#495057', fontSize: '14px' }}>
                    {new Date(m.date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })}
                  </td>
                  <td style={{ padding: '12px', color: '#495057', fontSize: '14px' }}>
                    {m.meal_name}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: m.isHealthy ? 'rgba(180, 162, 253, 0.1)' : '#f8f9fa',
                      color: m.isHealthy ? 'rgb(180, 162, 253)' : '#6c757d',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {m.isHealthy ? 'Полезно' : 'Обычное'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: m.points_earned >= 0 ? 'rgba(180, 162, 253, 0.1)' : '#fff3f3',
                      color: m.points_earned >= 0 ? 'rgb(180, 162, 253)' : '#dc3545',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {m.points_earned >= 0 ? `+${m.points_earned}` : m.points_earned}
                    </span>
                  </td>
                </tr>
              ))}
              {meals.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#adb5bd' }}>
                    Нет записей о питании. Начните отслеживать свой рацион!
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

export default Meals