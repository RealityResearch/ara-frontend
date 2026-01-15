'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SCRIPTED_THOUGHTS, getRandomizedDelay } from '@/lib/scriptedThoughts';
import { AgentThought } from '@/lib/mockData';

// Extended type for more granular coloring
export type ThoughtType = 'analysis' | 'trade' | 'info' | 'decision' | 'alert' | 'reflection' | 'hypothesis' | 'action' | 'status';

export interface EnhancedThought extends AgentThought {
  model?: string;
  latencyMs?: number;
  questionFrom?: string;
}

function formatTimestamp(): string {
  return new Date().toLocaleTimeString('en-US', {
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

  // Always show as "connected" - it's theatrical
  const isConnected = true;
  const connectionState = 'connected' as const;
  const model = 'claude-sonnet-4-20250514';

  const thoughtIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  const addThought = useCallback((thought: EnhancedThought) => {
    if (!mountedRef.current || !thought?.message) return;

    // Clear any existing typing animation
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    setIsTyping(true);
    setCurrentText('');

    const message = thought.message || '';
    let charIndex = 0;

    // Typing animation at ~50 chars/sec
    typingIntervalRef.current = setInterval(() => {
      if (!mountedRef.current) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        return;
      }

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
    }, 20);
  }, []);

  const scheduleNextThought = useCallback(() => {
    if (!mountedRef.current) return;

    const scriptedThought = SCRIPTED_THOUGHTS[thoughtIndexRef.current];
    const delay = getRandomizedDelay(scriptedThought.delay);

    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) return;

      // Create the thought with current timestamp
      const thought: EnhancedThought = {
        timestamp: formatTimestamp(),
        message: scriptedThought.message,
        type: scriptedThought.type,
        latencyMs: Math.floor(Math.random() * 200) + 50, // Fake latency 50-250ms
      };

      addThought(thought);

      // Move to next thought (loop back to start)
      thoughtIndexRef.current = (thoughtIndexRef.current + 1) % SCRIPTED_THOUGHTS.length;

      // Schedule the next one
      scheduleNextThought();
    }, delay);
  }, [addThought]);

  useEffect(() => {
    mountedRef.current = true;

    // Start the thought loop after a short initial delay
    timeoutRef.current = setTimeout(() => {
      scheduleNextThought();
    }, 1500);

    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [scheduleNextThought]);

  // Reconnect is now a no-op (it's all fake)
  const reconnect = useCallback(() => {
    // No-op for theatrical mode
  }, []);

  // Question submission is now a no-op
  const submitQuestion = useCallback((_question: string, _from: string) => {
    // No-op for theatrical mode
  }, []);

  return {
    thoughts,
    isTyping,
    currentText,
    isConnected,
    connectionState,
    reconnectAttempt: 0,
    marketData: null,
    model,
    lastLatency: Math.floor(Math.random() * 150) + 80,
    questionStatus: null,
    submitQuestion,
    reconnect,
  };
}
