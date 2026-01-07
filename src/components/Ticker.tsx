'use client';

import { useState, useEffect } from 'react';
import { mockTickerData } from '@/lib/mockData';

export function Ticker() {
  const [prices, setPrices] = useState(mockTickerData);
  const [flash, setFlash] = useState<Record<string, 'up' | 'down' | null>>({});

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(item => {
        const changeAmount = (Math.random() - 0.5) * 0.1;
        const newPrice = Math.max(0.001, item.price * (1 + changeAmount / 100));
        const newChange = item.change + changeAmount;

        // Flash effect
        if (changeAmount > 0) {
          setFlash(f => ({ ...f, [item.symbol]: 'up' }));
        } else {
          setFlash(f => ({ ...f, [item.symbol]: 'down' }));
        }
        setTimeout(() => {
          setFlash(f => ({ ...f, [item.symbol]: null }));
        }, 300);

        return {
          ...item,
          price: Number(newPrice.toFixed(item.price < 1 ? 6 : 2)),
          change: Number(newChange.toFixed(2))
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tickerItems = [...prices, ...prices];

  return (
    <div className="ticker-y2k" style={{ position: 'relative' }}>
      {/* Live indicator */}
      <div style={{
        position: 'absolute',
        left: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: '#FF0000',
        color: '#FFFFFF',
        fontSize: '9px',
        fontWeight: 'bold',
        padding: '2px 6px',
        zIndex: 10,
        border: '1px solid #CC0000'
      }}>
        <span className="blink">●</span> LIVE
      </div>

      <div className="ticker-y2k-scroll" style={{ display: 'flex', paddingLeft: '60px' }}>
        {tickerItems.map((item, index) => (
          <span
            key={`${item.symbol}-${index}`}
            className="ticker-y2k-item"
            style={{
              background: flash[item.symbol] === 'up' ? 'rgba(0, 255, 0, 0.3)' :
                         flash[item.symbol] === 'down' ? 'rgba(255, 0, 0, 0.3)' : 'transparent',
              transition: 'background 0.15s'
            }}
          >
            <span style={{ color: '#FFCC00', fontWeight: 'bold' }}>{item.symbol}</span>
            {' '}
            <span style={{ color: '#FFFFFF' }}>${item.price < 1 ? item.price.toFixed(6) : item.price.toLocaleString()}</span>
            {' '}
            <span style={{
              color: item.change >= 0 ? '#00FF00' : '#FF6666',
              fontWeight: 'bold'
            }}>
              {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}%
            </span>
            {item.symbol === '$ARA' && (
              <span className="blink" style={{ color: '#FF00FF', marginLeft: '4px' }}>★</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
