/**
 * @desc 様々なtweenの設定
 */

interface HeaderElement {
  [key: string]: string | number | boolean;
}

const HEADER_TWEEN: HeaderElement = {
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
};

interface TweenElement {
  [key: string]: string | number | boolean | {};
}

const IMAGE_TWEEN: TweenElement = {
  opacity: 1,
  /** 初回で実行しない。 */
  paused: true,
  delay: 1,
  duration: 1.5,
  y: -10,
  ease: 'power2.out',
  // 複数要素を扱うプロパティ
  stagger: {
    from: 'start',
    amount: 0.8,
  },
};

/**
 * timeline
 */

const TIME_LINE: TweenElement = {
  defaults: { ease: 'power2.out', duration: 1.5 },
  scrollTrigger: {
    markers: true, // マーカーを表示するか
    trigger: '.content', // この要素と交差するとイベントが発火
    start: 'top 50%', // ウィンドウのどの位置を発火の基準点にするか
    end: 'bottom 25%', // ウィンドウのどの位置をイベントの終了点にするか
    toggleActions: 'play none none none', // スクロールイベントで発火するアニメーションの種類
  },
};

export { HEADER_TWEEN, IMAGE_TWEEN, TIME_LINE };
