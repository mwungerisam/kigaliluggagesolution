import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', variant = 'light' }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  const subtextColor = variant === 'dark' ? '#ffffff' : '#1a1a1a';

  return (
    <div className={`flex flex-col items-start select-none ${className}`}>
      <span 
        className="font-black uppercase tracking-tight leading-none text-[#990000]"
        style={{
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: isSm ? '1rem' : isLg ? '1.85rem' : '1.3rem',
          fontWeight: 900,
          letterSpacing: '-0.03em',
        }}
      >
        KIGALI
      </span>
      <span 
        className="uppercase font-bold leading-none mt-1"
        style={{
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: isSm ? '0.55rem' : isLg ? '0.85rem' : '0.68rem',
          letterSpacing: '0.24em',
          color: subtextColor,
        }}
      >
        <span className="lowercase font-normal">luggage</span> SOLUTION
      </span>
    </div>
  );
};
