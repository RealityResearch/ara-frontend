'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { mockThoughts, AgentThought } from '@/lib/mockData';

const WS_URL = process.env.NEXT_PUBLIC_AGENT_WS_URL || 'ws://localhost:8080';

export interface MarketData {
  price: number;
  priceFormatted: string;
  change24h: number;
  volume24h: number;
  marketCap: number;
  holders: number;
  walletSol: number;
  walletAra: number;
  walletValue: number;
}

export interface EnhancedThought extends AgentThought {
  model?: string;
  latencyMs?: number;
  questionFrom?: string;
}

function mapMessageType(type: string): AgentThought['type'] {
  const mapping: Record<string, AgentThought['type']> = {
    thought: 'analysis',
    analysis: 'analysis',
    action: 'trade',
    status: 'info',
    question_answer: 'decision',
    user_question: 'alert', // User questions show as alert (different color)
    market_update: 'info',
  };
  return mapping[type] || 'info';
}

function formatTimestamp(timestamp?: number): string {
  const date = timestamp ? new Date(timestamp) : new Date();
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export function useAgentThoughts() {
  const [thoughts, setThoughts] = useState<EnhancedThought[]>(() => {
    return mockThoughts.slice(0, 3).map((thought, i) => {
      const now = new Date();
      now.setSeconds(now.getSeconds() - (3 - i) * 15);
      return {
        ...thought,
        timestamp: formatTimestamp(now.getTime()),
      };
    });
  });
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [lastLatency, setLastLatency] = useState<number | null>(null);
  const [questionStatus, setQuestionStatus] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mockIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mockIndexRef = useRef(3);
  const hasConnectedRef = useRef(false);

  const submitQuestion = useCallback((question: string, from: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'question',
        question,
        from
      }));
      setQuestionStatus('Submitting...');
    } else {
      setQuestionStatus('Not connected to agent');
    }
  }, []);

  useEffect(() => {
    if (hasConnectedRef.current) return;
    hasConnectedRef.current = true;

    if (typeof window === 'undefined') return;

    const addThought = (thought: EnhancedThought) => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }

      setIsTyping(true);
      setCurrentText('');

      let charIndex = 0;
      typingIntervalRef.current = setInterval(() => {
        if (charIndex < thought.message.length) {
          setCurrentText(thought.message.slice(0, charIndex + 1));
          charIndex++;
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
          }
          setIsTyping(false);
          setThoughts(prev => [...prev.slice(-19), thought]);
          setCurrentText('');
        }
      }, 15);
    };

    const connectWebSocket = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) return;

      try {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
          console.log('Connected to agent service');
          setIsConnected(true);
          if (mockIntervalRef.current) {
            clearInterval(mockIntervalRef.current);
            mockIntervalRef.current = null;
          }
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);

            // Handle question received acknowledgment
            if (message.type === 'question_received') {
              setQuestionStatus(message.content);
              setTimeout(() => setQuestionStatus(null), 5000);
              return;
            }

            // Update market data if present
            if (message.marketData) {
              setMarketData(message.marketData);
            }

            // Update model info
            if (message.model) {
              setModel(message.model);
            }

            // Update latency
            if (message.latencyMs) {
              setLastLatency(message.latencyMs);
            }

            // Skip market_update type from showing in terminal
            if (message.type === 'market_update') {
              return;
            }

            // Skip if no content
            if (!message.content) return;

            const thought: EnhancedThought = {
              timestamp: formatTimestamp(message.timestamp),
              message: message.content,
              type: mapMessageType(message.type),
              model: message.model,
              latencyMs: message.latencyMs,
              questionFrom: message.questionFrom,
            };
            addThought(thought);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        };

        ws.onclose = () => {
          console.log('Disconnected from agent service');
          setIsConnected(false);
          wsRef.current = null;

          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, 5000);
        };

        ws.onerror = () => {};

        wsRef.current = ws;
      } catch (error) {
        console.error('Failed to connect:', error);
      }
    };

    const startMockMode = () => {
      if (mockIntervalRef.current) return;

      console.log('Agent service not available, using mock mode');
      mockIntervalRef.current = setInterval(() => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
          const thought = mockThoughts[mockIndexRef.current % mockThoughts.length];
          addThought({
            ...thought,
            timestamp: formatTimestamp(),
          });
          mockIndexRef.current++;
        }
      }, 5000);
    };

    connectWebSocket();

    const mockFallbackTimeout = setTimeout(() => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        startMockMode();
      }
    }, 2000);

    return () => {
      hasConnectedRef.current = false;
      clearTimeout(mockFallbackTimeout);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (mockIntervalRef.current) clearInterval(mockIntervalRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  return {
    thoughts,
    isTyping,
    currentText,
    isConnected,
    marketData,
    model,
    lastLatency,
    questionStatus,
    submitQuestion
  };
}
