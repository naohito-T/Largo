import { gsap as G } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
/** util */
import { TweenFactory as TF, TweenSettings as TS } from './utils';
/** scss */
import './assets/sass/style.scss';

// プラグインはgsap.registerPluginで登録
G.registerPlugin(ScrollTrigger);

/** class name */
const HEADER_IN_H1 = 'header h1';
const IMAGE_CONTENER = '.img-container img';

// const button = document.querySelector("header");
// const images = document.querySelectorAll(".img-container__item");
// // const images = document.getElementById('images');
const button = document.querySelector('header');
const images = document.querySelectorAll('.img-container__item');

// gsapはtweenという単位でアニメーションを作成する。
const headerTween = TF.tweenFactory(button, TS.HEADER_TWEEN);

const op = {
  opacity: 1,
  y: -10,
};

const showContent = () => {
  // 以下のtween.play()とgsap.to()は同じことをしている
  headerTween?.play();

  images.forEach((image) => {
    const tween = TF.tweenSpreedFactory(image, TS.IMAGE_TWEEN);
    tween?.play();
  });

  G.to(HEADER_IN_H1, {
    opacity: 1,
  });

  // スクロールイベントの制御

  TF.tweenTimeFactory(TS.TIME_LINE)
    .to('.content-box h2', {
      ...op,
    })
    .to(
      '.content-box p',
      {
        ...op,
      },
      '-=1'
    ) // 直前のアニメーションに0.7秒かぶせる
    .to(
      '.content img',
      {
        ...op,
      },
      '-=1'
    ); // 直前のアニメーションに0.7秒かぶせる

  // navigation
  TF.tweenTimeFactory(TS.TIME_LINE).to(
    '.navigation-items a',
    {
      ...op,
    },
    '-=1'
  );
};

if (button !== null) {
  button.addEventListener('click', showContent, { once: true });
}
