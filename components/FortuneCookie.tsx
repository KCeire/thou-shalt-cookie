'use client';
import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { getRandomFortune } from '../utils/fortunes';
import { pay, getPaymentStatus } from '@base-org/account';
import { BasePayButton } from '@base-org/account-ui/react';

export default function FortuneCookie() {
  const [fortune, setFortune] = useState<string>('');
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTipOptions, setShowTipOptions] = useState(false);

  // Your wallet address for receiving payments
  const RECIPIENT_ADDRESS = "0xdE2bDb0F443CAda8102A73940CC8E27079c513D4"; // Replace with your actual address

  // MiniKit ready call
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const crackCookie = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setShowTipOptions(false);
    
    setTimeout(() => {
      const newFortune = getRandomFortune();
      setFortune(newFortune);
      setIsOpened(true);
      setIsAnimating(false);
      // Show tip options with minimal delay for SDK readiness
      setTimeout(() => setShowTipOptions(true), 300);
    }, 800);
  };

  const resetCookie = () => {
    setIsOpened(false);
    setFortune('');
    setShowTipOptions(false);
  };

  const handleTip = async (amount: string, message: string) => {
    try {
      const result = await pay({
        amount,
        to: RECIPIENT_ADDRESS,
        testnet: false // Set to false for mainnet
      }) as { id: string };

      // Poll for payment completion
      const checkPayment = async () => {
        const { status } = await getPaymentStatus({ 
          id: result.id,
          testnet: false // Must match the testnet setting above
        });
        
        if (status === 'completed') {
          alert(`🎭 ${message} The Bard thanks thee for thy generosity!`);
          setShowTipOptions(false);
        } else if (status === 'pending') {
          // Keep checking
          setTimeout(checkPayment, 2000);
        }
      };

      checkPayment();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const shareFortune = async () => {
    const shareText = `"${fortune}" - Thou Shalt Cookie 🎭🥠\n\nGet your own Shakespearean crypto wisdom at thoushaltcookie.xyz`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      alert('Fortune copied to clipboard! 📋\n\nShare this Shakespearean wisdom and let others discover thoushaltcookie.xyz! 🎭');
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Fortune copied to clipboard! 📋\n\nShare this wisdom and spread the word about thoushaltcookie.xyz! 🎭');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-lg w-full">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-white mb-3 drop-shadow-lg text-center" 
              style={{ 
                fontFamily: 'Cinzel, "Old English Text MT", "Blackletter", "Times New Roman", serif',
                fontWeight: '700',
                fontSize: '2rem',
                letterSpacing: '0.03em',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                lineHeight: '1.2',
                overflow: 'visible'
              }}>
            🎭 Thou Shalt Cookie 🎭
          </h1>
          <p className="text-indigo-200 text-lg">
            Shakespearean wisdom meets crypto chaos
          </p>
          <p className="text-indigo-300 text-sm mt-2">
            To HODL or not to HODL, that is the question
          </p>
        </div>

        {/* Cookie or Fortune Display */}
        <div className="mb-8">
          {!isOpened ? (
            <div className="text-center">
              <button
                onClick={crackCookie}
                disabled={isAnimating}
                className={`
                  text-9xl hover:scale-110 transition-all duration-300 
                  ${isAnimating ? 'animate-pulse scale-105' : 'hover:rotate-12 active:scale-95'}
                  disabled:opacity-50 drop-shadow-2xl
                `}
                style={{ 
                  filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
                }}
              >
                🥠
              </button>
              <p className="text-indigo-200 mt-4 text-lg">
                {isAnimating ? 'Consulting the Bard...' : 'Crack thy cookie for wisdom!'}
              </p>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/30 shadow-2xl">
              <div className="text-7xl mb-6">📜</div>
              <blockquote className="text-white text-xl leading-relaxed font-serif italic">
                {fortune}
              </blockquote>
              <div className="mt-4 text-indigo-200 text-sm">
                — The Crypto Bard
              </div>
              
              {/* Tip Options */}
              {showTipOptions && (
                <div className="mt-6 pt-4 border-t border-white/20">
                  <p className="text-amber-300 text-sm mb-4">Enjoyed the wisdom? Support the Bard! 🎭</p>
                  
                  {/* $1 Tip Only */}
                  <div className="flex flex-col items-center">
                    <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2 shadow-lg">
                      Toss a Coin - $1 💰
                    </div>
                    <BasePayButton
                      onClick={() => handleTip('1.00', 'A coin for the jester!')}
                      colorScheme="light"
                    />
                  </div>
                  
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {!isOpened ? (
            <div className="text-indigo-200 text-center">
              <p className="mb-2">
                {isAnimating ? '🎭 Channeling Shakespeare...' : '👆 Tap the sacred cookie above'}
              </p>
              <p className="text-sm opacity-75">
                Random wisdom mode active
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={resetCookie}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 w-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🥠 Crack Another Cookie
              </button>
              
              <button
                onClick={shareFortune}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 w-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📤 Share Thy Wisdom
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-indigo-300 text-sm space-y-2">
          <div className="pt-4">
            <p className="text-indigo-400 text-xs">
              Created for fun by KC •{' '}
              <a 
                href="https://farcaster.xyz/kc-8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Farcaster
              </a>
              {' '}•{' '}
              <a 
                href="https://x.com/stellarextinct" 
                target="_blank" 
                rel="noOpener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                X
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 