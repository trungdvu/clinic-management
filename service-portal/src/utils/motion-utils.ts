import { Variants } from 'framer-motion';

export const defailtEase = [0.25, -0.05, 0.01, 0.1];

export const defaultPageVariants: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.6, ease: defailtEase },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, ease: defailtEase },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6, ease: defailtEase },
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
    transition: { duration: 0.2, ease: defailtEase },
  },
};

interface GenerateFadeInFadeOut {
  initialOpacity?: number;
  animteOpacity?: number;
  exitOpacity?: number;
  duration?: number;
  delay?: number;
}
export function generateFadeInFadeOut(varitans?: GenerateFadeInFadeOut) {
  const {
    initialOpacity = 0,
    animteOpacity = 1,
    exitOpacity = 0,
    duration = 0.3,
    delay = 0,
  } = varitans || {};

  return {
    initial: {
      opacity: initialOpacity,
    },
    animate: {
      opacity: animteOpacity,
      transition: {
        duration: duration,
        delay: delay,
        ease: defailtEase,
      },
    },
    exit: {
      opacity: exitOpacity,
      transition: {
        duration: duration,
        ease: defailtEase,
      },
    },
  } as Variants;
}
