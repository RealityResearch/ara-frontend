'use client';

import { useState, useEffect } from 'react';

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "The AI agent trades 24/7 while you sleep!",
    "All trades are logged on-chain for transparency.",
    "Creator fees fund the agent's trading wallet.",
    "Watch the terminal to see the AI think in real-time!",
    "Diamond hands are rewarded. WAGMI!",
  ];

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Rotate tips
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#C0C0C0',
        border: '2px outset #FFFFFF',
        maxWidth: '450px',
        width: '100%',
        boxShadow: '4px 4px 0 rgba(0,0,0,0.5)'
      }}>
        {/* Title Bar */}
        <div style={{
          background: 'linear-gradient(to right, #000080 0%, #1084D0 100%)',
          padding: '4px 8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '12px' }}>
            <span className="spin-slow">🎉</span> Welcome to Claude Investments!
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="btn-y2k"
            style={{ padding: '0 6px', fontSize: '12px', lineHeight: '1.2' }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '16px' }}>
          {/* Logo Area */}
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div className="rainbow-text" style={{
              fontSize: '24px',
              fontFamily: 'Impact, sans-serif',
              letterSpacing: '2px'
            }}>
              WELCOME!
            </div>
            <div style={{ fontSize: '11px', color: '#666666' }}>
              You are visitor #<span style={{ fontFamily: 'Courier New', color: '#008800' }}>
                {Math.floor(Math.random() * 9000) + 1000}
              </span> today!
            </div>
          </div>

          {/* Announcement Box */}
          <div style={{
            background: '#FFFFCC',
            border: '2px dashed #CC0000',
            padding: '12px',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            <div className="blink" style={{ color: '#CC0000', fontWeight: 'bold', fontSize: '14px' }}>
              🚨 AI AGENT NOW LIVE! 🚨
            </div>
            <div style={{ fontSize: '11px', marginTop: '8px' }}>
              The autonomous trading agent is actively managing<br />
              the portfolio. Watch it think in real-time!
            </div>
          </div>

          {/* Tip of the Day */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #CCCCCC',
            padding: '8px',
            marginBottom: '12px'
          }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#003399', marginBottom: '4px' }}>
              <span className="sparkle">💡</span> Tip of the Day:
            </div>
            <div style={{ fontSize: '11px', fontStyle: 'italic', minHeight: '32px' }}>
              &quot;{tips[tipIndex]}&quot;
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button
              onClick={() => setIsVisible(false)}
              className="btn-buy-y2k bounce"
              style={{ fontSize: '12px' }}
            >
              🚀 ENTER SITE
            </button>
            <button
              onClick={() => {
                setIsVisible(false);
                document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-action"
              style={{ fontSize: '11px' }}
            >
              📟 VIEW TERMINAL
            </button>
          </div>

          {/* Checkbox */}
          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '10px', color: '#666666' }}>
            <label style={{ cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '4px' }} />
              Don&apos;t show this again (doesn&apos;t actually work lol)
            </label>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          background: '#E0E0E0',
          borderTop: '1px solid #999999',
          padding: '6px 12px',
          fontSize: '9px',
          color: '#666666',
          textAlign: 'center'
        }}>
          <span className="spin-slow">🌐</span> Best viewed with Netscape Navigator 4.0 or higher <span className="spin-slow">🌐</span>
        </div>
      </div>
    </div>
  );
}
