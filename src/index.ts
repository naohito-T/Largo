import './sass/style.scss';
import { gsap as g } from 'gsap';

const el = document.querySelector('.header');

const tween = g.to('.header', {
  duration: 0.5, // アニメーションの時間
  paused: true, // 勝手にアニメーションが始まらないように
  ease: 'power2.out', // イージング
  top: 0,
});

const setup = () => {
  console.log('click');
  tween.play();

  g.to('.img-container img', {
    opacity: 1,
    delay: 1,
    duration: 1.5,
    y: -10,
    ease: 'power2.out',
    // 複数要素を扱うプロパティ
    stagger: {
      from: 'start',
      amount: 0.8,
    },
  });
};

if (el !== null) {
  el.addEventListener('click', setup);
}

const tl = g.timeline({
  repeat: -1, // アニメーションの繰り返し回数。-1で無限回
  repeatDelay: 0.3, // ループとループの間の時間
  defaults: { duration: 0.5, ease: 'power4.out' }, // tweenのデフォルトの値
});

// アニメーションを実行
tl.from('.box', {
  scale: 0,
})
  .to('.box1', {
    left: 50,
  })
  .to(
    '.box2',
    {
      right: 50,
    },
    '<'
  ) // "<"は「前のアニメーションと同時に再生する」オプション
  .to('.box', {
    scale: 0,
  });
