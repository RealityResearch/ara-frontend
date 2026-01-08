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
      <div className="skeu-window" style={{
        maxWidth: '450px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
      }}>
        {/* Title Bar */}
        <div className="skeu-window-titlebar">
          <span>
            <span className="spin-slow">*</span> Welcome to Claude Investments!
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="skeu-btn"
            style={{ padding: '0 8px', fontSize: '12px', lineHeight: '1.2' }}
          >
            X
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '16px', background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)' }}>
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
          <div className="skeu-panel" style={{
            padding: '12px',
            marginBottom: '12px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, #fffde8 0%, #fff8d0 100%)',
            border: '2px dashed #CC0000'
          }}>
            <div className="blink" style={{ color: '#CC0000', fontWeight: 'bold', fontSize: '14px' }}>
              ! AI AGENT NOW LIVE !
            </div>
            <div style={{ fontSize: '11px', marginTop: '8px' }}>
              The autonomous trading agent is actively managing<br />
              the portfolio. Watch it think in real-time!
            </div>
          </div>

          {/* Tip of the Day */}
          <div className="skeu-panel" style={{
            padding: '8px',
            marginBottom: '12px'
          }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#003399', marginBottom: '4px' }}>
              <span className="sparkle">*</span> Tip of the Day:
            </div>
            <div style={{ fontSize: '11px', fontStyle: 'italic', minHeight: '32px' }}>
              &quot;{tips[tipIndex]}&quot;
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button
              onClick={() => setIsVisible(false)}
              className="skeu-btn-green skeu-btn bounce"
              style={{ fontSize: '12px' }}
            >
              ENTER SITE
            </button>
            <button
              onClick={() => {
                setIsVisible(false);
                document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="skeu-btn"
              style={{ fontSize: '11px' }}
            >
              VIEW TERMINAL
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
        <div className="skeu-metallic" style={{
          padding: '6px 12px',
          fontSize: '9px',
          color: '#666666',
          textAlign: 'center',
          borderRadius: '0 0 8px 8px'
        }}>
          <span className="spin-slow">~</span> Best viewed with Netscape Navigator 4.0 or higher <span className="spin-slow">~</span>
        </div>
      </div>
    </div>
  );
}
