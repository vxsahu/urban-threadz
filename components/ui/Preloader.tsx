'use client'
import React, { useEffect, useState } from 'react';

const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setDone(true);
      setTimeout(() => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }, 700);
    }, 1500);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'radial-gradient(ellipse at 60% 40%, #f8fafc 0%, #e0e7ef 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: done ? 'none' : 'auto',
        opacity: done ? 0 : 1,
        transition: 'opacity 0.7s cubic-bezier(.77,0,.18,1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Animated Thread Ball */}
        <div className="relative border-2 border-dashed border-gray-300 rounded-full p-2">
      <svg
        width="28"
        height="28"
        viewBox="0 0 20 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300 group-hover:fill-[var(--primary)]"
      >
        <path
          d="M12.584 5.50586C16.8543 6.64495 19.9999 10.5388 20 15.168C19.9999 20.6906 15.5227 25.1678 10 25.168C4.47737 25.1678 0.000104118 20.6906 0 15.168C5.26341e-05 10.6937 2.93879 6.90497 6.99121 5.62793V17.4795C6.99124 19.0238 8.24283 20.2753 9.78711 20.2754C11.3315 20.2754 12.584 19.0239 12.584 17.4795V5.50586ZM19 0.5C19.5523 0.5 20 0.947715 20 1.5V9.37793C18.0781 5.82756 14.3207 3.41602 10 3.41602C5.67932 3.41602 1.92191 5.82756 0 9.37793V1.5C0 0.947715 0.447715 0.5 1 0.5H19Z"
          fill="currentColor"
        />
      </svg>
    </div>        {/* Brand Text with unique animation */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 7vw, 3.8rem)',
              letterSpacing: '0.12em',
              color: '#6366f1',
              textShadow: '0 2px 12px #6366f133',
              opacity: done ? 0 : 1,
              transform: done ? 'translateY(-40px) scale(0.95) skewX(-8deg)' : 'translateY(0) scale(1) skewX(0deg)',
              transition: 'all 0.8s cubic-bezier(.77,0,.18,1)',
              filter: `blur(${done ? 8 : 0}px)`,
            }}
          >
            Next
          </span>
          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 7vw, 3.8rem)',
              letterSpacing: '0.12em',
              color: '#0f172a',
              textShadow: '0 2px 12px #0f172a22',
              opacity: done ? 0 : 1,
              transform: done ? 'translateY(40px) scale(0.95) skewX(8deg)' : 'translateY(0) scale(1) skewX(0deg)',
              transition: 'all 0.8s cubic-bezier(.77,0,.18,1)',
              filter: `blur(${done ? 8 : 0}px)`,
            }}
          >
            Threadz
          </span>
        </div>
        {/* Subtext */}
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: '#64748b',
            letterSpacing: '0.04em',
            opacity: done ? 0 : 1,
            transform: done ? 'translateY(20px) scale(0.98)' : 'translateY(0) scale(1)',
            transition: 'all 0.7s cubic-bezier(.77,0,.18,1)',
            filter: `blur(${done ? 6 : 0}px)`,
            marginTop: 8,
          }}
        >
          Loading your style...
        </span>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .preloader-brand {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;