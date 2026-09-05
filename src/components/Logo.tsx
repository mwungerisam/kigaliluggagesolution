import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', variant = 'light' }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  const textColor = variant === 'dark' ? '#ffffff' : '#990000';

  return (
    <div className={`flex flex-col items-start select-none font-brand ${className}`}>
      <span 
        className="font-black uppercase tracking-tight leading-none"
        style={{
          fontFamily: "'Montserrat', 'Plus Jakarta Sans', sans-serif",
          fontSize: isSm ? '1.1rem' : isLg ? '2.1rem' : '1.45rem',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          color: textColor,
        }}
      >
        KIGALI
      </span>
      <span 
        className="leading-none mt-0.5 tracking-wider"
        style={{
          fontFamily: "'Montserrat', 'Plus Jakarta Sans', sans-serif",
          fontSize: isSm ? '0.52rem' : isLg ? '0.92rem' : '0.68rem',
          color: textColor,
        }}
      >
        <span className="lowercase font-normal">luggage</span>{' '}
        <span className="uppercase font-bold tracking-widest">SOLUTION</span>
      </span>
    </div>
  );
};

