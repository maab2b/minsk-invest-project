import React from 'react';

export const Logo = ({ className = '' }: { className?: string }) => (
  <div className={`flex flex-col items-center justify-center opacity-90 hover:opacity-100 transition-opacity ${className}`}>
    <svg viewBox="0 0 130 80" className="w-full h-auto drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Premium Gold Foil Gradient */}
        <linearGradient id="gold-premium" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BF953F" />
          <stop offset="25%" stopColor="#FCF6BA" />
          <stop offset="50%" stopColor="#B38728" />
          <stop offset="75%" stopColor="#FBF5B7" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>
        {/* Darker Gold for depth */}
        <linearGradient id="gold-premium-dark" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#AA771C" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A5A19" />
        </linearGradient>
      </defs>
      
      {/* The M - Sharp, geometric, elegant */}
      <path d="M 20 70 V 25 H 32 L 55 55 L 78 25 H 90 V 70 H 80 V 42 L 55 68 L 32 42 V 70 Z" fill="url(#gold-premium)" />
      
      {/* The Building - overlapping the right leg */}
      <path d="M 82 70 V 10 L 110 18 V 70 Z" fill="url(#gold-premium-dark)" />
      
      {/* Building Windows / Slits */}
      <rect x="88" y="25" width="14" height="1.5" fill="#001A33" />
      <rect x="88" y="33" width="14" height="1.5" fill="#001A33" />
      <rect x="88" y="41" width="14" height="1.5" fill="#001A33" />
      <rect x="88" y="49" width="14" height="1.5" fill="#001A33" />
      <rect x="88" y="57" width="14" height="1.5" fill="#001A33" />
      
      {/* Elegant Base Line */}
      <rect x="15" y="70" width="100" height="1.5" fill="url(#gold-premium)" />
    </svg>
    <div className="text-center mt-4">
      <h1 className="text-white font-sans tracking-[0.25em] text-lg md:text-xl leading-tight">БЕЛАРУСЬ</h1>
      <p className="text-brand-gold font-sans tracking-[0.25em] text-[0.5rem] uppercase mt-2 opacity-80">Управление активами</p>
    </div>
  </div>
);
