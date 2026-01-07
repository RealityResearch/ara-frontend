'use client';

import { useState, useEffect } from 'react';

export function LiveClock() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
      setDate(now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: '#000033',
      border: '2px inset #333333',
      padding: '4px 8px',
      fontFamily: 'Courier New, monospace',
      fontSize: '11px',
      display: 'inline-block'
    }}>
      <div style={{ color: '#00FF00', fontWeight: 'bold' }}>
        {time || '--:--:--'}
      </div>
      <div style={{ color: '#666666', fontSize: '9px' }}>
        {date || '---'}
      </div>
    </div>
  );
}
