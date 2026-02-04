'use client';

import { ReactNode } from 'react';
import { useScrollAnimation, useStaggeredAnimation, useCounterAnimation, useMouseFollow } from '@/hooks/useAnimations';
import { cn } from '@/lib/utils';

// ============ Fade In Animation ============
interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  className,
  threshold = 0.1,
}: FadeInProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const directionStyles = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: '',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${directionStyles[direction]}`,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

// ============ Scale In Animation ============
interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScaleIn({ children, delay = 0, duration = 500, className }: ScaleInProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

// ============ Staggered List Animation ============
interface StaggeredListProps {
  children: ReactNode[];
  delay?: number;
  className?: string;
  itemClassName?: string;
}

export function StaggeredList({ children, delay = 100, className, itemClassName }: StaggeredListProps) {
  const { containerRef, visibleItems } = useStaggeredAnimation(children.length, delay);

  return (
    <div ref={containerRef} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            'transition-all duration-500',
            visibleItems.has(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4',
            itemClassName
          )}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// ============ Animated Counter ============
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  formatter?: (value: number) => string;
}

export function AnimatedCounter({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  className,
  formatter,
}: AnimatedCounterProps) {
  const { ref, count } = useCounterAnimation(value, duration);

  const displayValue = formatter ? formatter(count) : count.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

// ============ Magnetic Button ============
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function MagneticButton({ children, className, intensity = 0.3 }: MagneticButtonProps) {
  const { ref, position } = useMouseFollow(intensity);

  return (
    <div
      ref={ref}
      className={cn('inline-block transition-transform duration-200', className)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </div>
  );
}

// ============ Floating Element ============
interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  amplitude = 10,
  duration = 3,
  delay = 0,
}: FloatingElementProps) {
  return (
    <div
      className={cn('animate-float', className)}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        // @ts-expect-error CSS custom property
        '--float-amplitude': `${amplitude}px`,
      }}
    >
      {children}
    </div>
  );
}

// ============ Glow Card ============
interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className, glowColor = '#f0b90b' }: GlowCardProps) {
  const { ref, position } = useMouseFollow(0.02);

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-[#1e2329] border border-[#2b3139] transition-all duration-300',
        'hover:border-[#3a4149] hover:shadow-xl',
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${position.y * 0.5}deg) rotateY(${-position.x * 0.5}deg)`,
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${50 + position.x * 2}% ${50 + position.y * 2}%, ${glowColor}15, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

// ============ Shimmer Text ============
interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
}

export function ShimmerText({ children, className }: ShimmerTextProps) {
  return (
    <span
      className={cn(
        'inline-block bg-gradient-to-r from-white via-[#f0b90b] to-white bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer-text',
        className
      )}
    >
      {children}
    </span>
  );
}

// ============ Reveal Text ============
interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function RevealText({ children, className, delay = 0 }: RevealTextProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <span ref={ref} className={cn('inline-block overflow-hidden', className)}>
      <span
        className={cn(
          'inline-block transition-transform duration-700',
          isVisible ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {children}
      </span>
    </span>
  );
}

// ============ Blur In Animation ============
interface BlurInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function BlurIn({ children, delay = 0, duration = 600, className }: BlurInProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

// ============ Gradient Border Card ============
interface GradientBorderCardProps {
  children: ReactNode;
  className?: string;
}

export function GradientBorderCard({ children, className }: GradientBorderCardProps) {
  return (
    <div className={cn('relative p-[1px] rounded-2xl overflow-hidden group', className)}>
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f0b90b] via-[#0ecb81] to-[#f0b90b] bg-[length:200%_100%] animate-gradient opacity-50 group-hover:opacity-100 transition-opacity" />
      {/* Content */}
      <div className="relative bg-[#1e2329] rounded-2xl">
        {children}
      </div>
    </div>
  );
}
