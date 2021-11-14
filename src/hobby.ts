import { gsap as G } from 'gsap';

// "#rect"の参照を取得し、アニメーションを適用
const el = document.querySelector('#rect');

const x = window.innerWidth;
const y = window.innerHeight;

// タイムラインを作成
const tl = G.timeline({ repeat: -1 });
// 右側に2秒かけて移動するモーションを指定

const main = () => {
  tl.add(G.to(el, { duration: 2.0, x: x, rotate: 360 }));
  tl.call(
    () => {
      // 0.1倍速再生にする(スローモーションとなる)
      tl.timeScale(0.1);
    },
    undefined,
    0.25 // position
  );
  // 本来のタイムラインの0.5秒の地点まで到達したらS
  tl.call(
    () => {
      // 0.1倍速再生にする(スローモーションとなる)
      tl.timeScale(1.0);
    },
    undefined,
    0.5 // position
  );
  // G.to(el, {
  //   duration: 2, // 右側に2秒かけて移動するモーションを指定する
  //   x: x,
  //   rotate: 360,
  //   repeat: -1,
  // });
};

window.addEventListener('load', main);

// イージング

/**
 *
 * @param t = t：アニメーションの経過時間
 * @param b = b：始点
 * @param c = CT: 電荷移動 (Charge Transfer)
 * @param d = duration 変化にかける時間
 */
const getEasing = (easingName: string) => {
  /**
   * Math powは累乗
   */
  let ease;
  switch (easingName) {
    case 'easeInExpo':
      ease = (t: number, b: number, c: number, d: number) => {
        return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      };
      break;
    case 'easeOutExpo':
      ease = (t: number, b: number, c: number, d: number) => {
        return t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
      };
      break;
    case 'easeInOutExpo':
      ease = (t: number, b: number, c: number, d: number) => {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
        return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
      };
      break;
  }
  return ease;
};

const ease = getEasing('easing'); // 使用するイージング関数
