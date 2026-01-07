'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { mockTickerData, type TickerItem } from '@/lib/mockData';

export function Ticker() {
  const [prices, setPrices] = useState<TickerItem[]>(mockTickerData);
  const [flash, setFlash] = useState<Record<string, 'up' | 'down' | null>>({});
  const [isLive, setIsLive] = useState(false);
  const prevPrices = useRef<Record<string, number>>({});

  // Fetch live prices from API
  const fetchPrices = useCallback(async () => {
    try {
      const response = await fetch('/api/ticker');
      if (!response.ok) throw new Error('API error');

      const data: TickerItem[] = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        // Check for price changes and trigger flash
        data.forEach(item => {
          const prevPrice = prevPrices.current[item.symbol];
          if (prevPrice !== undefined && prevPrice !== item.price) {
            const direction = item.price > prevPrice ? 'up' : 'down';
            setFlash(f => ({ ...f, [item.symbol]: direction }));
            setTimeout(() => {
              setFlash(f => ({ ...f, [item.symbol]: null }));
            }, 300);
          }
          prevPrices.current[item.symbol] = item.price;
        });

        setPrices(data);
        setIsLive(true);
      }
    } catch (error) {
      console.error('Failed to fetch ticker prices:', error);
      // Keep using mock data as fallback
    }
  }, []);

  // Fetch on mount and every 15 seconds
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const tickerItems = [...prices, ...prices];

  return (
    <div className="ticker-y2k" style={{ position: 'relative' }}>
      {/* Live indicator */}
      <div style={{
        position: 'absolute',
        left: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: isLive ? '#FF0000' : '#666666',
        color: '#FFFFFF',
        fontSize: '9px',
        fontWeight: 'bold',
        padding: '2px 6px',
        zIndex: 10,
        border: `1px solid ${isLive ? '#CC0000' : '#444444'}`
      }}>
        <span className="blink">●</span> {isLive ? 'LIVE' : 'DEMO'}
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
