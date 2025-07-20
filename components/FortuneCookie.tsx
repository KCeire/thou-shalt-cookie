'use client';
import { useState } from 'react';
import { getRandomFortune, getFortuneOfTheDay } from '../utils/fortunes';

export default function FortuneCookie() {
  const [fortune, setFortune] = useState<string>('');
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [useDailyFortune, setUseDailyFortune] = useState(false);

  const crackCookie = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Animation delay for better UX
    setTimeout(() => {
      const newFortune = useDailyFortune ? getFortuneOfTheDay() : getRandomFortune();
      setFortune(newFortune);
      setIsOpened(true);
      setIsAnimating(false);
    }, 800);
  };

  const resetCookie = () => {
    setIsOpened(false);
    setFortune('');
  };

  const shareFortune = () => {
    const shareText = `"${fortune}" - Thou Shalt Cookie 🎭🥠`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Thou Shalt Cookie - Shakespearean Crypto Wisdom',
        text: shareText,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Fortune copied to clipboard! 📋');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-lg w-full">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            🎭 Thou Shalt Cookie
          </h1>
          <p className="text-indigo-200 text-lg">
            Shakespearean wisdom meets crypto chaos
          </p>
          <p className="text-indigo-300 text-sm mt-2">
            To HODL or not to HODL, that is the question
          </p>
        </div>

        {/* Cookie Mode Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4 text-white">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useDailyFortune}
                onChange={(e) => setUseDailyFortune(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 border-white rounded ${useDailyFortune ? 'bg-purple-500' : 'bg-transparent'} flex items-center justify-center mr-2`}>
                {useDailyFortune && <span className="text-white text-xs">✓</span>}
              </div>
              <span className="text-sm">Daily Fortune Mode</span>
            </label>
          </div>
        </div>

        {/* Cookie or Fortune Display */}
        <div className="mb-8">
          {!isOpened ? (
            // Cookie Button
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
            // Fortune Display
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/30 shadow-2xl">
              <div className="text-7xl mb-6">📜</div>
              <blockquote className="text-white text-xl leading-relaxed font-serif italic">
                {fortune}
              </blockquote>
              <div className="mt-4 text-indigo-200 text-sm">
                — The Crypto Bard
              </div>
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
                {useDailyFortune ? 'Today\'s wisdom awaits...' : 'Random wisdom mode active'}
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
          <p>✨ Built with MiniKit & OnchainKit ✨</p>
          <p>🎭 All the world is a blockchain, and all traders merely hodlers 🎭</p>
        </div>
      </div>
    </div>
  );
} 