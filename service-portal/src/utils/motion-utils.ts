import { Variants } from 'framer-motion';

export const defaultEase = [0.25, -0.05, 0.01, 0.1];

export const defaultPageVariants: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.6, ease: defaultEase },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, ease: defaultEase },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6, ease: defaultEase },
    willChange: 'opacity',
  },
};

export const defaultLayoutVariants: Variants = {
  initial: {
    x: 23,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.2, ease: defaultEase },
  },
};

interface GenerateFadeInFadeOut {
  initialOpacity?: number;
  animateOpacity?: number;
  exitOpacity?: number;
  duration?: number;
  delay?: number;
}
export function generateFadeInFadeOut(variants?: GenerateFadeInFadeOut) {
  const {
    initialOpacity = 0,
    animateOpacity = 1,
    exitOpacity = 0,
    duration = 0.3,
    delay = 0,
  } = variants || {};

  return {
    initial: {
      opacity: initialOpacity,
    },
    animate: {
      opacity: animateOpacity,
      transition: {
        duration: duration,
        delay: delay,
        ease: defaultEase,
      },
    },
    exit: {
      opacity: exitOpacity,
      transition: {
        duration: duration,
        ease: defaultEase,
      },
    },
  } as Variants;
}
