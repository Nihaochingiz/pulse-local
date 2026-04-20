import React, { useState } from 'react'
import { pointsAPI } from '../api'

const REWARDS = [
  { id: 1, name: 'Пицца', cost: 100, description: 'Закажи пиццу в выходной' },
  { id: 2, name: 'Кино', cost: 200, description: 'Сходи в кино' },
  { id: 3, name: 'Новая книга', cost: 300, description: 'Купи любую книгу' },
  { id: 4, name: 'Игра в Steam', cost: 500, description: 'Купи игру в Steam' },
  { id: 5, name: 'Персональная тренировка', cost: 1000, description: 'Занятие с тренером' },
  { id: 6, name: 'Абонемент в спортзал', cost: 2000, description: 'Месячный абонемент' }
]

function PointsGame({ points, onSpend }) {
  const [message, setMessage] = useState('')

  const handleBuyReward = (reward) => {
    if (points >= reward.cost) {
      setMessage(`Поздравляю! Ты получил "${reward.name}"! ${reward.description}`)
      setTimeout(() => {
        setMessage('')
      }, 4000)
    } else {
      setMessage(`Не хватает ${reward.cost - points} очков для "${reward.name}"`)
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }

  const handleResetPoints = async () => {
    if (window.confirm('Сбросить все очки? Это действие нельзя отменить.')) {
      try {
        await pointsAPI.reset()
        onSpend()
        setMessage('Очки сброшены. Начинай копить заново!')
        setTimeout(() => setMessage(''), 3000)
      } catch (error) {
        console.error('Error resetting points:', error)
      }
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
        border: '1px solid #e9ecef',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '64px',
          fontWeight: 'bold',
          color: 'rgb(180, 162, 253)',
          marginBottom: '8px'
        }}>
          {points}
        </div>
        <div style={{ color: '#6c757d', fontSize: '16px', marginBottom: '24px' }}>
          всего очков заработано
        </div>
        <button
          onClick={handleResetPoints}
          style={{
            padding: '10px 24px',
            background: '#f8f9fa',
            color: '#dc3545',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Сбросить очки
        </button>
      </div>

      {message && (
        <div style={{
          padding: '16px',
          marginBottom: '24px',
          background: 'rgba(180, 162, 253, 0.1)',
          border: '1px solid rgb(180, 162, 253)',
          borderRadius: '8px',
          textAlign: 'center',
          color: 'rgb(180, 162, 253)',
          fontSize: '14px'
        }}>
          {message}
        </div>
      )}

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{
          color: 'rgb(33, 32, 33)',
          fontSize: '24px',
          marginBottom: '24px',
          fontWeight: '600'
        }}>
          Доступные награды
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {REWARDS.map(reward => (
            <div
              key={reward.id}
              onClick={() => handleBuyReward(reward)}
              style={{
                background: '#f8f9fa',
                borderRadius: '12px',
                padding: '20px',
                border: points >= reward.cost 
                  ? '1px solid rgb(180, 162, 253)' 
                  : '1px solid #dee2e6',
                cursor: points >= reward.cost ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s',
                opacity: points >= reward.cost ? 1 : 0.6
              }}
            >
              <div style={{
                fontSize: '32px',
                marginBottom: '12px'
              }}>
                {reward.name === 'Пицца' && '🍕'}
                {reward.name === 'Кино' && '🎬'}
                {reward.name === 'Новая книга' && '📚'}
                {reward.name === 'Игра в Steam' && '🎮'}
                {reward.name === 'Персональная тренировка' && '💪'}
                {reward.name === 'Абонемент в спортзал' && '🏋️'}
              </div>
              <h3 style={{
                color: 'rgb(33, 32, 33)',
                fontSize: '18px',
                marginBottom: '8px',
                fontWeight: '600'
              }}>
                {reward.name}
              </h3>
              <p style={{
                color: '#6c757d',
                fontSize: '13px',
                marginBottom: '16px',
                lineHeight: '1.4'
              }}>
                {reward.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  color: 'rgb(180, 162, 253)',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>
                  {reward.cost}
                </span>
                <span style={{ color: '#adb5bd', fontSize: '12px' }}>очков</span>
              </div>
              <button
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '10px',
                  background: points >= reward.cost 
                    ? 'rgb(180, 162, 253)' 
                    : '#e9ecef',
                  color: points >= reward.cost ? 'white' : '#adb5bd',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: points >= reward.cost ? 'pointer' : 'not-allowed'
                }}
              >
                {points >= reward.cost ? 'Получить' : 'Закрыто'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        marginTop: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{
          color: 'rgb(33, 32, 33)',
          fontSize: '18px',
          marginBottom: '16px',
          fontWeight: '600'
        }}>
          Как заработать очки
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <div style={{ color: 'rgb(180, 162, 253)', fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>10 очков/км</div>
            <div style={{ color: '#6c757d', fontSize: '12px' }}>+ бонус за быстрый темп</div>
          </div>
          <div>
            <div style={{ color: 'rgb(180, 162, 253)', fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>1 очко/5 отжиманий</div>
            <div style={{ color: '#6c757d', fontSize: '12px' }}>Каждое повторение в счет</div>
          </div>
          <div>
            <div style={{ color: 'rgb(180, 162, 253)', fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>До 10 очков/прием</div>
            <div style={{ color: '#6c757d', fontSize: '12px' }}>Награда за полезную еду</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PointsGame