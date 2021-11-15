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

export { HEADER_TWEEN, IMAGE_TWEEN };
