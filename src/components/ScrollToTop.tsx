'use client';

import { useState, useEffect } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setClickCount(prev => prev + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    }}>
      {/* Live Status Indicator */}
      <div style={{
        background: '#000033',
        border: '2px outset #003366',
        padding: '6px 10px',
        fontSize: '9px',
        fontFamily: 'Courier New, monospace',
        color: '#00FF00',
        textAlign: 'center'
      }}>
        <span className="blink">●</span> AGENT LIVE
        <br />
        <span style={{ color: '#FFCC00' }}>$ARA</span>
      </div>

      {/* Scroll Button */}
      <button
        onClick={scrollToTop}
        className="btn-y2k bounce"
        style={{
          padding: '8px 12px',
          fontSize: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          minWidth: '70px'
        }}
      >
        <span style={{ fontSize: '16px' }}>⬆️</span>
        <span>TOP</span>
      </button>

      {/* Easter egg counter */}
      {clickCount > 0 && (
        <div style={{
          background: '#FFFFCC',
          border: '1px solid #CCCC99',
          padding: '2px 6px',
          fontSize: '8px',
          color: '#666666'
        }}>
          Clicks: {clickCount}
          {clickCount >= 10 && <span className="rainbow-text"> 🎉</span>}
        </div>
      )}
    </div>
  );
}
