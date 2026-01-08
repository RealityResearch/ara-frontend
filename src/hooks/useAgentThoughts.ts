'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AgentThought } from '@/lib/mockData';

const WS_URL = process.env.NEXT_PUBLIC_AGENT_WS_URL || 'ws://localhost:8080';

// Reconnection config
const INITIAL_RECONNECT_DELAY = 1000;  // 1 second
const MAX_RECONNECT_DELAY = 30000;     // 30 seconds
const RECONNECT_MULTIPLIER = 1.5;

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

// Extended type for more granular coloring
export type ThoughtType = 'analysis' | 'trade' | 'info' | 'decision' | 'alert' | 'reflection' | 'hypothesis' | 'action' | 'status';

function mapMessageType(type: string): ThoughtType {
  const mapping: Record<string, ThoughtType> = {
    thought: 'analysis',
    analysis: 'analysis',
    action: 'action',
    trade: 'trade',
    status: 'status',
    question_answer: 'decision',
    user_question: 'alert',
    market_update: 'info',
    reflection: 'reflection',
    hypothesis: 'hypothesis',
    learning: 'analysis',
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
  const [thoughts, setThoughts] = useState<EnhancedThought[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<'connecting' | 'connected' | 'disconnected' | 'reconnecting'>('disconnected');
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [lastLatency, setLastLatency] = useState<number | null>(null);
  const [questionStatus, setQuestionStatus] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectDelayRef = useRef(INITIAL_RECONNECT_DELAY);
  const mountedRef = useRef(true);

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

  const addThought = useCallback((thought: EnhancedThought) => {
    if (!thought?.message) return;

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    setIsTyping(true);
    setCurrentText('');

    const message = thought.message || '';
    let charIndex = 0;
    typingIntervalRef.current = setInterval(() => {
      if (charIndex < message.length) {
        setCurrentText(message.slice(0, charIndex + 1));
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
  }, []);

  const connect = useCallback(() => {
    if (!mountedRef.current) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) return;
    if (wsRef.current?.readyState === WebSocket.CONNECTING) return;

    // Clean up existing connection
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setConnectionState('connecting');

    try {
      const ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        if (!mountedRef.current) {
          ws.close();
          return;
        }
        console.log('✅ Connected to agent service');
        setIsConnected(true);
        setConnectionState('connected');
        setReconnectAttempt(0);
        reconnectDelayRef.current = INITIAL_RECONNECT_DELAY;
      };

      ws.onmessage = (event) => {
        if (!mountedRef.current) return;

        try {
          const message = JSON.parse(event.data);

          if (message.type === 'question_received') {
            setQuestionStatus(message.content);
            setTimeout(() => setQuestionStatus(null), 5000);
            return;
          }

          if (message.marketData) {
            setMarketData(message.marketData);
          }

          if (message.model) {
            setModel(message.model);
          }

          if (message.latencyMs) {
            setLastLatency(message.latencyMs);
          }

          if (message.type === 'market_update') {
            return;
          }

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

      ws.onclose = (event) => {
        if (!mountedRef.current) return;

        console.log(`❌ Disconnected from agent service (code: ${event.code})`);
        setIsConnected(false);
        wsRef.current = null;

        // Don't reconnect if closed intentionally (code 1000) or component unmounted
        if (event.code === 1000) {
          setConnectionState('disconnected');
          return;
        }

        // Exponential backoff reconnection
        const delay = reconnectDelayRef.current;
        setConnectionState('reconnecting');
        setReconnectAttempt(prev => prev + 1);

        console.log(`🔄 Reconnecting in ${delay / 1000}s...`);

        reconnectTimeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            reconnectDelayRef.current = Math.min(
              reconnectDelayRef.current * RECONNECT_MULTIPLIER,
              MAX_RECONNECT_DELAY
            );
            connect();
          }
        }, delay);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      setConnectionState('disconnected');
    }
  }, [addThought]);

  // Manual reconnect function
  const reconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    reconnectDelayRef.current = INITIAL_RECONNECT_DELAY;
    setReconnectAttempt(0);
    connect();
  }, [connect]);

  useEffect(() => {
    mountedRef.current = true;
    connect();

    return () => {
      mountedRef.current = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close(1000); // Normal closure
      }
    };
  }, [connect]);

  return {
    thoughts,
    isTyping,
    currentText,
    isConnected,
    connectionState,
    reconnectAttempt,
    marketData,
    model,
    lastLatency,
    questionStatus,
    submitQuestion,
    reconnect,
  };
}
