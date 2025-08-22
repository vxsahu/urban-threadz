'use client'
import React, { useEffect, useRef, useState } from 'react';

const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Prevent body scroll during preloader
    document.body.style.overflow = 'hidden';
    
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 700);

    // Complete animation and call onComplete
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        document.body.style.overflow = 'unset';
        if (onComplete) onComplete();
      }, 0);
    }, 1600);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: isComplete ? 'none' : 'auto',
        opacity: isComplete ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        willChange: 'opacity',
      }}
    >
      {/* Left (white) half */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(24px, 5vw, 48px)',
          color: '#111',
          letterSpacing: '0.1em',
          overflow: 'hidden',
          transform: isAnimating ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        Urban
      </div>
      
      {/* Right (black) half */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: '#111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(24px, 5vw, 48px)',
          color: '#fff',
          letterSpacing: '0.1em',
          overflow: 'hidden',
          transform: isAnimating ? 'translateY(100%)' : 'translateY(0)',
          transition: 'transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        Threadz
      </div>
    </div>
  );
};

export default Preloader;