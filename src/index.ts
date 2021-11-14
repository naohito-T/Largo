import { gsap as G } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
/** util */
import { tweenFactory, tweenSpreedFactory } from './utils';
/** scss */
import './sass/style.scss';

// プラグインはgsap.registerPluginで登録
G.registerPlugin(ScrollTrigger);

/** class name */
const HEADER_IN_H1 = 'header h1';
const IMAGE_CONTENER = '.img-container img';

const button = document.querySelector('header');
const images = document.querySelector('.img-container');

// gsapはtweenという単位でアニメーションを作成する。
const headerTween = tweenFactory(button, {
  duration: 0.5,
  paused: true,
  ease: 'power2.out',
  width: '100%',
  height: '100px',
  lineHeight: '100px',
  borderRadius: '0%',
  cursor: 'default',
  top: 0,
  backgroundColor: '#000',
});

const constentWrapTweenImg = tweenSpreedFactory(images as HTMLElement, {
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

const showContent = () => {
  // 以下のtween.play()とgsap.to()は同じことをしている
  headerTween?.play();

  G.to(HEADER_IN_H1, {
    opacity: 1,
  });
  // 画像郡を連続的に表示するアニメーションの制御
  // G.to('.img-container img', {
  //   opacity: 1,
  //   delay: 1,
  //   duration: 1.5,
  //   y: -10,
  //   ease: 'power2.out',
  //   // 複数要素を扱うプロパティ
  //   stagger: {
  //     from: 'start',
  //     amount: 0.8,
  //   },
  // });
  if (constentWrapTweenImg !== undefined) {
    constentWrapTweenImg.play();
    console.log('done');
  } else {
    console.log('undefined');
  }

  // スクロールイベントの制御
  G.timeline({
    defaults: { ease: 'power2.out', duration: 1.5 },
    scrollTrigger: {
      markers: true, // マーカーを表示するか
      trigger: '.content', // この要素と交差するとイベントが発火
      start: 'top 50%', // ウィンドウのどの位置を発火の基準点にするか
      end: 'bottom 25%', // ウィンドウのどの位置をイベントの終了点にするか
      toggleActions: 'play none none none', // スクロールイベントで発火するアニメーションの種類
    },
  })
    .to('.content-box h2', {
      opacity: 1,
      y: -10,
    })
    .to(
      '.content-box p',
      {
        opacity: 1,
        y: -10,
      },
      '-=1'
    ) // 直前のアニメーションに0.7秒かぶせる
    .to(
      '.content img',
      {
        opacity: 1,
        x: -10,
      },
      '-=1'
    ); // 直前のアニメーションに0.7秒かぶせる
};

if (button !== null) {
  button.addEventListener('click', showContent, { once: true });
}
