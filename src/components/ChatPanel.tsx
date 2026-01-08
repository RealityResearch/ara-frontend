'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: number;
  replyTo?: string; // For bot replies, reference to user message
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const WS_URL = wsUrl || process.env.NEXT_PUBLIC_AGENT_WS_URL || 'ws://localhost:8080';

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log('Chat connected');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Handle chat messages
        if (data.type === 'chat_message') {
          const newMsg: ChatMessage = {
            id: data.id || `${Date.now()}-${Math.random()}`,
            type: data.from === 'bot' ? 'bot' : 'user',
            message: data.message,
            timestamp: data.timestamp || Date.now(),
            replyTo: data.replyTo,
          };
          setMessages(prev => [...prev.slice(-50), newMsg]); // Keep last 50 messages
        }

        // Handle chat history on connect
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

        // Handle online count
        if (data.type === 'online_count') {
          setOnlineCount(data.count || 1);
        }

        // Handle send confirmation
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

    const message = inputValue.trim().slice(0, 280); // Limit to 280 chars

    ws.send(JSON.stringify({
      type: 'chat_message',
      message,
      anonId,
      timestamp: Date.now(),
    }));

    // Optimistically add to local messages
    const newMsg: ChatMessage = {
      id: `local-${Date.now()}`,
      type: 'user',
      message: `@${anonId}: ${message}`,
      timestamp: Date.now(),
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
    <div style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div className="skeu-section-header">
        COMMUNITY CHAT
        <span style={{ marginLeft: '8px', fontSize: '9px', color: isConnected ? '#66FF66' : '#FFAA00' }}>
          {isConnected ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      {/* Main Panel */}
      <div className="skeu-window" style={{ borderRadius: '0 0 8px 8px' }}>
        {/* Title Bar */}
        <div className="skeu-window-titlebar">
          <span>Talk to the Branch Manager</span>
          <span style={{ fontSize: '9px', color: '#99CCFF', fontWeight: 'normal' }}>
            {onlineCount} online | You are @{anonId}
          </span>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="skeu-terminal"
          style={{
            height: '240px',
            overflow: 'auto',
            padding: '8px',
            borderRadius: 0,
          }}
        >
          {messages.length === 0 ? (
            <div style={{ color: '#666666', textAlign: 'center', paddingTop: '80px' }}>
              <div style={{ marginBottom: '8px' }}>No messages yet</div>
              <div style={{ fontSize: '10px' }}>Be the first to chat with the bot!</div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  marginBottom: '6px',
                  padding: msg.type === 'bot' ? '6px 8px' : '2px 0',
                  background: msg.type === 'bot' ? 'rgba(0, 170, 255, 0.1)' : 'transparent',
                  borderLeft: msg.type === 'bot' ? '2px solid #00AAFF' : 'none',
                  borderRadius: msg.type === 'bot' ? '0 4px 4px 0' : 0,
                }}
              >
                <span style={{ color: '#555555', fontSize: '9px' }}>
                  [{formatTime(msg.timestamp)}]
                </span>{' '}
                {msg.type === 'bot' ? (
                  <>
                    <span style={{ color: '#00AAFF', fontWeight: 'bold' }}>BOT:</span>{' '}
                    <span style={{ color: '#00DDFF' }}>{msg.message}</span>
                  </>
                ) : (
                  <span style={{ color: '#00CC00' }}>{msg.message}</span>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '8px',
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderTop: '1px solid #a0a0a0',
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Say something to the bot..."
              className="skeu-input"
              style={{
                flex: 1,
                fontSize: '11px',
              }}
              maxLength={280}
              disabled={!isConnected}
            />
            <button
              onClick={sendMessage}
              disabled={!isConnected || !inputValue.trim()}
              className="skeu-btn-green skeu-btn"
              style={{
                fontSize: '11px',
                padding: '6px 16px',
                opacity: isConnected && inputValue.trim() ? 1 : 0.5,
              }}
            >
              Send
            </button>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '4px',
            fontSize: '9px',
            color: '#666666',
          }}>
            <span>
              {sendStatus ? (
                <span style={{ color: '#008800' }}>{sendStatus}</span>
              ) : (
                `${280 - inputValue.length} chars left`
              )}
            </span>
            <span>Bot responds to ~3 messages per cycle</span>
          </div>
        </div>

        {/* Info Bar */}
        <div style={{
          background: 'linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)',
          borderTop: '1px solid #a0a0a0',
          padding: '6px 8px',
          fontSize: '9px',
          color: '#666666',
          textAlign: 'center',
          borderRadius: '0 0 8px 8px',
        }}>
          Messages are anonymous | Bot picks interesting messages to respond to
        </div>
      </div>
    </div>
  );
}
