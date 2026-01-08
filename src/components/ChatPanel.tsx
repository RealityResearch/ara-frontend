'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: number;
  replyTo?: string;
}

interface ChatPanelProps {
  wsUrl?: string;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
}

function generateAnonId(): string {
  const adjectives = ['swift', 'clever', 'bold', 'calm', 'wise', 'keen', 'bright', 'quick'];
  const nouns = ['ape', 'degen', 'whale', 'trader', 'holder', 'bull', 'bear', 'moon'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 99);
  return `${adj}_${noun}${num}`;
}

export function ChatPanel({ wsUrl }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [anonId] = useState(() => typeof window !== 'undefined' ? generateAnonId() : 'anon');
  const [onlineCount, setOnlineCount] = useState(1);
  const [sendStatus, setSendStatus] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('--:--:--');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const WS_URL = wsUrl || process.env.NEXT_PUBLIC_AGENT_WS_URL || 'ws://localhost:8080';

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'chat_message') {
          const newMsg: ChatMessage = {
            id: data.id || `${Date.now()}-${Math.random()}`,
            type: data.from === 'bot' ? 'bot' : 'user',
            message: data.message,
            timestamp: data.timestamp || Date.now(),
            replyTo: data.replyTo,
          };
          setMessages(prev => {
            if (prev.some(m => m.id === newMsg.id)) {
              return prev;
            }
            return [...prev.slice(-50), newMsg];
          });
        }

        if (data.type === 'chat_history') {
          const history: ChatMessage[] = (data.messages || []).map((m: ChatMessage) => ({
            id: m.id || `${m.timestamp}-${Math.random()}`,
            type: m.type,
            message: m.message,
            timestamp: m.timestamp,
            replyTo: m.replyTo,
          }));
          setMessages(history);
        }

        if (data.type === 'online_count') {
          setOnlineCount(data.count || 1);
        }

        if (data.type === 'chat_sent') {
          setSendStatus('Sent!');
          setTimeout(() => setSendStatus(null), 2000);
        }
      } catch (e) {
        console.error('Error parsing chat message:', e);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [WS_URL]);

  const sendMessage = useCallback(() => {
    if (!ws || ws.readyState !== WebSocket.OPEN || !inputValue.trim()) return;

    const message = inputValue.trim().slice(0, 280);
    const msgId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = Date.now();

    ws.send(JSON.stringify({
      type: 'chat_message',
      id: msgId,
      message,
      anonId,
      timestamp,
    }));

    const newMsg: ChatMessage = {
      id: msgId,
      type: 'user',
      message: `@${anonId}: ${message}`,
      timestamp,
    };
    setMessages(prev => [...prev.slice(-50), newMsg]);

    setInputValue('');
  }, [ws, inputValue, anonId]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bb-terminal" style={{ marginBottom: '16px' }}>
      {/* Bloomberg Header */}
      <div className="bb-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="bb-brand">COMMUNITY CHAT</span>
          <span style={{ color: '#ffaa00', fontSize: '10px' }}>BRANCH MANAGER</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#666666', fontSize: '9px' }}>{onlineCount} online</span>
          <span className="bb-time">{currentTime}</span>
          <span className={isConnected ? 'bb-badge bb-badge-live' : 'bb-badge bb-badge-offline'}>
            {isConnected ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* User ID Display */}
      <div style={{
        background: '#0d0d0d',
        padding: '4px 8px',
        borderBottom: '1px solid #333333',
        fontSize: '9px',
      }}>
        <span style={{ color: '#666666' }}>YOU ARE:</span>
        <span style={{ color: '#00ff00', marginLeft: '8px' }}>@{anonId}</span>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        style={{
          background: '#000000',
          height: '200px',
          overflow: 'auto',
          padding: '8px',
          fontFamily: '"Courier New", monospace',
          fontSize: '10px',
        }}
      >
        {messages.length === 0 ? (
          <div style={{ color: '#666666', textAlign: 'center', paddingTop: '80px' }}>
            <div style={{ marginBottom: '8px', color: '#ff6600' }}>NO MESSAGES YET</div>
            <div style={{ fontSize: '9px' }}>Be the first to chat with the bot!</div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                marginBottom: '6px',
                padding: msg.type === 'bot' ? '6px 8px' : '2px 0',
                background: msg.type === 'bot' ? 'rgba(51, 153, 255, 0.1)' : 'transparent',
                borderLeft: msg.type === 'bot' ? '2px solid #3399ff' : 'none',
              }}
            >
              <span style={{ color: '#666666', fontSize: '9px' }}>
                [{formatTime(msg.timestamp)}]
              </span>{' '}
              {msg.type === 'bot' ? (
                <>
                  <span style={{ color: '#3399ff', fontWeight: 'bold' }}>BOT:</span>{' '}
                  <span style={{ color: '#00ddff' }}>{msg.message}</span>
                </>
              ) : (
                <span style={{ color: '#00ff00' }}>{msg.message}</span>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        background: '#0d0d0d',
        borderTop: '1px solid #333333',
        padding: '8px',
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Say something to the bot..."
            className="bb-input"
            style={{ flex: 1 }}
            maxLength={280}
            disabled={!isConnected}
          />
          <button
            onClick={sendMessage}
            disabled={!isConnected || !inputValue.trim()}
            style={{
              background: isConnected && inputValue.trim()
                ? 'linear-gradient(180deg, #00aa00 0%, #006600 100%)'
                : '#333333',
              border: '1px solid #00ff00',
              color: '#ffffff',
              padding: '4px 16px',
              fontFamily: 'Courier New',
              fontWeight: 'bold',
              fontSize: '11px',
              cursor: isConnected && inputValue.trim() ? 'pointer' : 'not-allowed',
              opacity: isConnected && inputValue.trim() ? 1 : 0.5,
            }}
          >
            SEND
          </button>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '4px',
          fontSize: '9px',
        }}>
          <span style={{ color: sendStatus ? '#00ff00' : '#666666' }}>
            {sendStatus || `${280 - inputValue.length} chars left`}
          </span>
          <span style={{ color: '#666666' }}>Bot responds to ~3 messages per cycle</span>
        </div>
      </div>

      {/* Function Keys */}
      <div className="bb-function-keys">
        <button className="bb-fkey">
          <span className="bb-fkey-label">F1</span>
          HELP
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F2</span>
          CLEAR
        </button>
        <button className="bb-fkey" style={{ marginLeft: 'auto' }}>
          <span className="bb-fkey-label">F10</span>
          MENU
        </button>
      </div>

      {/* Command Line */}
      <div className="bb-command">
        <span className="bb-prompt">{'>'}</span>
        <span style={{ color: '#ff6600' }}>CHAT GO</span>
        <span className="bb-cursor"></span>
      </div>
    </div>
  );
}
