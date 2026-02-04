'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 36, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
    xl: { icon: 64, text: 'text-3xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Logo Icon - Abstract "A" */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0b90b" />
            <stop offset="100%" stopColor="#d9a60a" />
          </linearGradient>
        </defs>

        {/* Outer ring */}
        <circle cx="24" cy="24" r="22" stroke="url(#logoGradient)" strokeWidth="2" fill="none" opacity="0.3"/>

        {/* Main background */}
        <circle cx="24" cy="24" r="20" fill="url(#logoGradient)" />

        {/* Abstract "A" shape */}
        <path
          d="M24 10L14 34H18.5L20.5 29H27.5L29.5 34H34L24 10Z"
          fill="#0b0e11"
        />
        {/* Inner triangle cutout */}
        <path
          d="M24 18L21 26H27L24 18Z"
          fill="url(#logoGradient)"
        />
      </svg>

      {showText && (
        <div className={cn('font-bold tracking-tight', text)}>
          <span className="text-white">Aevon</span>
          <span className="text-[#f0b90b]">X</span>
        </div>
      )}
    </div>
  );
}

// Animated version for loading states
export function LogoAnimated({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizes = {
    sm: 28,
    md: 36,
    lg: 48,
    xl: 64,
  };

  return (
    <div className="relative">
      <svg
        width={sizes[size]}
        height={sizes[size]}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse"
      >
        <defs>
          <linearGradient id="logoGradientAnim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0b90b" />
            <stop offset="100%" stopColor="#d9a60a" />
          </linearGradient>
        </defs>

        {/* Spinning outer ring */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="url(#logoGradientAnim)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="20 10"
          className="animate-spin origin-center"
          style={{ animationDuration: '3s' }}
        />

        <circle cx="24" cy="24" r="18" fill="url(#logoGradientAnim)" />

        <path
          d="M24 12L16 32H19.5L21 28H27L28.5 32H32L24 12Z"
          fill="#0b0e11"
        />
        <path
          d="M24 19L22 25H26L24 19Z"
          fill="url(#logoGradientAnim)"
        />
      </svg>
    </div>
  );
}
