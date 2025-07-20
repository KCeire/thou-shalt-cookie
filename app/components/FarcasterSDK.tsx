'use client';

import { useEffect } from 'react';

export function FarcasterSDKInitializer() {
  useEffect(() => {
    const initializeFarcasterSDK = async () => {
      // Check if we're in a Farcaster context
      const isFarcaster = window.parent !== window || 
                         window.location.search.includes('miniApp=true') ||
                         window.location.pathname.includes('/mini');

      if (isFarcaster) {
        try {
          const { sdk } = await import('@farcaster/miniapp-sdk');
          // Signal to Farcaster that the app is ready
          await sdk.actions.ready();
          console.log('Farcaster SDK initialized successfully');
        } catch (error) {
          console.warn('Farcaster SDK initialization failed:', error);
        }
      }
    };

    initializeFarcasterSDK();
  }, []);

  return null; // This component renders nothing
} 