'use client';

import {
  mockPerformance,
  mockEvolution,
  mockTradeHistory,
  type PerformanceData,
  type EvolutionData,
  type DetailedTrade,
} from '@/lib/mockData';

export interface AgentStats {
  performance: PerformanceData;
  evolution: EvolutionData;
  tradeHistory: DetailedTrade[];
  isLive: boolean;
}

// Theatrical mode: always return static mock data
export function useAgentStats(): AgentStats {
  return {
    performance: mockPerformance,
    evolution: mockEvolution,
    tradeHistory: mockTradeHistory,
    isLive: true, // Always "live" for theatrical effect
  };
}
