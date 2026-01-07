'use client';

import { useState, useEffect, useRef } from 'react';
import {
  mockPerformance,
  mockEvolution,
  mockTradeHistory,
  type PerformanceData,
  type EvolutionData,
  type DetailedTrade,
} from '@/lib/mockData';

const WS_URL = process.env.NEXT_PUBLIC_AGENT_WS_URL || 'ws://localhost:8080';

export interface AgentStats {
  performance: PerformanceData;
  evolution: EvolutionData;
  tradeHistory: DetailedTrade[];
  isLive: boolean;
}

export function useAgentStats(): AgentStats {
  const [performance, setPerformance] = useState<PerformanceData>(mockPerformance);
  const [evolution, setEvolution] = useState<EvolutionData>(mockEvolution);
  const [tradeHistory, setTradeHistory] = useState<DetailedTrade[]>(mockTradeHistory);
  const [isLive, setIsLive] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasConnectedRef = useRef(false);

  useEffect(() => {
    if (hasConnectedRef.current) return;
    hasConnectedRef.current = true;

    if (typeof window === 'undefined') return;

    const connectWebSocket = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) return;

      try {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
          console.log('[useAgentStats] Connected to agent service');
          setIsLive(true);
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);

            // Handle state updates
            if (message.type === 'state_update') {
              if (message.performance) {
                setPerformance(message.performance);
              }
              if (message.evolution) {
                setEvolution(message.evolution);
              }
              if (message.tradeHistory) {
                setTradeHistory(message.tradeHistory);
              }
            }
          } catch (error) {
            console.error('[useAgentStats] Error parsing message:', error);
          }
        };

        ws.onclose = () => {
          console.log('[useAgentStats] Disconnected');
          setIsLive(false);
          wsRef.current = null;

          // Attempt to reconnect
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, 5000);
        };

        ws.onerror = () => {
          // Silently handle errors, onclose will fire
        };

        wsRef.current = ws;
      } catch (error) {
        console.error('[useAgentStats] Failed to connect:', error);
      }
    };

    connectWebSocket();

    return () => {
      hasConnectedRef.current = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    performance,
    evolution,
    tradeHistory,
    isLive,
  };
}
