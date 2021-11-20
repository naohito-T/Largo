import { gsap as G } from 'gsap';

let i = 0;

G.set('.line', {
  attr: {
    stroke: 'hsl(1,100%, 50%)',
    'stroke-width': 4,
    'stroke-linecap': 'round',
  },
});
G.set('.line2', { attr: { 'stroke-width': 6 }, opacity: 0.4 });
G.set('.line3', { attr: { 'stroke-width': 9 }, opacity: 0.15 });

[].forEach.call(document.getElementsByClassName('.line'), (el) => {
  G.timeline({
    defaults: { duration: 1 },
    repeat: -1,
    repeatDelay: (27 - i) / 50,
  })

    .to(
      el,
      {
        duration: 2,
        attr: { stroke: 'hsl(360, 100%, 50%)', ease: 'power2.inOut' },
      },
      0 // 0病後に実行する
    )
    .fromTo(
      el,
      { drawSVG: '0' },
      { drawSVG: '35% 70%', ease: 'sine.in' },
      i / 50
    )
    .to(el, { drawSVG: '100% 100%', ease: 'sine.out' }, 1 + i / 50)

    .progress(i / 20);
  i++;
});
