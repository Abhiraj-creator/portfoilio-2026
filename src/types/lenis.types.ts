
import type { ReactNode } from 'react';
import type Lenis from 'lenis';

/**
 * Defines the configuration options for the Lenis instance.
 * Matches the constructor arguments of the Lenis class.
 */
export interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
  autoRaf?: boolean;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal' | 'both';
  syncTouch?: boolean;
  lerp?: number;
  anchors?: boolean;
  overscroll?: boolean;
  prevent?: (node: Element) => boolean;
}

/**
 * Props for the SmoothScroller wrapper component.
 */
export interface SmoothScrollerProps {
  children: ReactNode;
  options?: SmoothScrollOptions;
}

/**
 * Optional: Type for the Lenis instance ref if you need to access it directly.
 */
export type LenisInstance = Lenis;   