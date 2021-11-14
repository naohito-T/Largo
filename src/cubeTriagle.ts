import { gsap as G } from 'gsap';
import './sass/cubeTriagle.scss';

const select = (e: any) => document.querySelector(e);
const selectAll = (e: any) => document.querySelectorAll(e);

const getDocProp = gsap.getProperty(':root');
const midCol = getDocProp('--mid-color');
const outCol = getDocProp('--out-color');
const faceDuration = 0.5;
const staggerOffset = 0.1;
const easing = 'sine.inOut';
const gtl = gsap.timeline({ repeat: -1, delay: 0.5 });

G.set('.container', { autoAlpha: 1 });

const facesIn = () => {
  const tl = gsap
    .timeline({
      defaults: {
        scaleY: 1,
        opacity: 0.9,
        backgroundColor: midCol,
        transformOrigin: 'center bottom',
        duration: faceDuration,
        ease: easing,
        stagger: {
          each: staggerOffset,
        },
      },
    })
    .to('.face--back .face__panel', {})
    .to('.face--right .face__panel', {}, 0)
    .to('.face--bottom .face__panel', {}, 0)
    .to('.face--top .face__panel', {}, 0.3)
    .to('.face--left .face__panel', {}, 0.3)
    .to('.face--front .face__panel', {}, 0.3);

  return tl;
};

const facesOut = () => {
  const tl = gsap
    .timeline({
      defaults: {
        scaleY: 0,
        opacity: 0,
        backgroundColor: outCol,
        transformOrigin: 'center top',
        duration: faceDuration,
        ease: easing,
        stagger: {
          each: staggerOffset,
        },
      },
    })
    .to('.face--top .face__panel', {})
    .to('.face--left .face__panel', {}, 0)
    .to('.face--front .face__panel', {}, 0)
    .to('.face--back .face__panel', {}, 0.3)
    .to('.face--right .face__panel', {}, 0.3)
    .to('.face--bottom .face__panel', {}, 0.3);

  return tl;
};

gtl.add(facesIn()).add(facesOut(), '-=0.3').timeScale(1.1);
