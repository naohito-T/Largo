import { gsap as G } from 'gsap';

/** どのプロジェクトでも使えるmethodを意識しろ */
export const tweenFactory = (
  el: HTMLElement | null,
  op: { [key: string]: string | number | boolean }
): gsap.core.Tween | undefined => {
  if (el === null) return undefined;
  return G.to(el, { ...op });
};

export const tweenSpreedFactory = <T extends Element | null>(
  el: T,
  op: { [key: string]: string | number | boolean | {} }
): gsap.core.Tween | undefined => {
  if (el === null) return undefined;
  return G.to(el, { ...op });
};

/**
 * timeline
 */

export const tweenTimeFactory = (op: {
  [key: string]: string | number | boolean | {};
}): gsap.core.Timeline => {
  return G.timeline({ ...op });
};
