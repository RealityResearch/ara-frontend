'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { mockTickerData, type TickerItem } from '@/lib/mockData';

export function Ticker() {
  const [prices, setPrices] = useState<TickerItem[]>(mockTickerData);
  const [isLive, setIsLive] = useState(false);
  const prevPrices = useRef<Record<string, number>>({});

  const fetchPrices = useCallback(async () => {
    try {
      const response = await fetch('/api/ticker');
      if (!response.ok) throw new Error('API error');

      const data: TickerItem[] = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        data.forEach(item => {
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

  const formatPrice = (price: number) => {
    if (price < 0.01) return price.toFixed(6);
    if (price < 1) return price.toFixed(4);
    return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Duplicate for seamless scroll
  const tickerItems = [...prices, ...prices];

  return (
    <div className="ticker">
      <div className="ticker-live-badge">
        <span className="ticker-live-dot" data-live={isLive}></span>
        <span className="ticker-live-text" data-live={isLive}>
          {isLive ? 'LIVE' : 'DEMO'}
        </span>
      </div>

      <div className="ticker-track">
        <div className="ticker-content">
          {tickerItems.map((item, index) => (
            <div key={`${item.symbol}-${index}`} className="ticker-item">
              <span className="ticker-symbol">{item.symbol}</span>
              <span className="ticker-price">${formatPrice(item.price)}</span>
              <span className={`ticker-change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}%
              </span>
              {item.symbol === '$ARA' && <span className="ticker-star">★</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
