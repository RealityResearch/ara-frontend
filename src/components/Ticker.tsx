'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { mockTickerData, type TickerItem } from '@/lib/mockData';

export function Ticker() {
  const [prices, setPrices] = useState<TickerItem[]>(mockTickerData);
  const [flash, setFlash] = useState<Record<string, 'up' | 'down' | null>>({});
  const [isLive, setIsLive] = useState(false);
  const prevPrices = useRef<Record<string, number>>({});

  const fetchPrices = useCallback(async () => {
    try {
      const response = await fetch('/api/ticker');
      if (!response.ok) throw new Error('API error');

      const data: TickerItem[] = await response.json();
      if (Array.isArray(data) && data.length > 0) {
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
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const tickerItems = [...prices, ...prices];

  return (
    <div className="ticker">
      {/* Live indicator */}
      <div style={{
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        background: isLive ? 'rgba(45, 138, 78, 0.2)' : 'rgba(156, 149, 141, 0.2)',
        borderRadius: 'var(--radius-full)',
      }}>
        <span
          className="live-dot"
          style={{
            width: '5px',
            height: '5px',
            background: isLive ? 'var(--terminal-green)' : 'var(--text-muted)',
          }}
        ></span>
        <span style={{
          color: isLive ? 'var(--terminal-green)' : 'var(--text-muted)',
          fontSize: '9px',
          fontWeight: '600',
          letterSpacing: '0.5px',
        }}>
          {isLive ? 'LIVE' : 'DEMO'}
        </span>
      </div>

      {/* Scrolling content */}
      <div className="ticker-content" style={{ paddingLeft: '80px' }}>
        {tickerItems.map((item, index) => (
          <span
            key={`${item.symbol}-${index}`}
            className="ticker-item"
            style={{
              background: flash[item.symbol] === 'up'
                ? 'rgba(74, 222, 128, 0.2)'
                : flash[item.symbol] === 'down'
                ? 'rgba(201, 70, 61, 0.2)'
                : 'transparent',
              transition: 'background 0.15s',
              borderRadius: '4px',
              padding: '4px 16px',
            }}
          >
            <span className="ticker-symbol">{item.symbol}</span>
            <span className="ticker-price">
              ${item.price < 1 ? item.price.toFixed(6) : item.price.toLocaleString()}
            </span>
            <span className={item.change >= 0 ? 'ticker-positive' : 'ticker-negative'}>
              {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
            </span>
            {item.symbol === '$ARA' && (
              <span style={{
                color: 'var(--claude-terracotta)',
                marginLeft: '4px',
                fontSize: '10px',
              }}>★</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
