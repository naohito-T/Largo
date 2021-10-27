import { gsap as G } from 'gsap';

export class TweenToFactory {
  private duration?: number;
  private paused?: boolean;
  private ease?: string;
  private width?: string;
  private height?: string;
  private lineHeight?: string;
  private borderRadius?: string;
  private cursor?: string;
  private top?: number;
  private backgroundColor?: string;

  public constructor(
    el: HTMLElement,
    op: { [key: string]: string | number | boolean }
  ) {
    if (el !== null) {
      G.to(el, { ...op });
    }
  }

  public get tweenToFactory() {
    return;
  }
}

export const tweenFactory = (
  el: HTMLElement | null,
  op: { [key: string]: string | number | boolean }
): gsap.core.Tween | undefined => {
  if (el === null) return undefined;
  return G.to(el, { ...op });
};
