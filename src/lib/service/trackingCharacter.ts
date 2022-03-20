import { gsap as G } from 'gsap';
import '../../assets/sass/trackingCharcter.scss';

/** factory */
const select = (e: string) => document.querySelector(e);

const txt = select('.txt');
const scene = select('.scene');
const face = select('.face');
const numSteps = 8;
const stepHeight = 100 / numSteps;
const stepAngle = 75;
// let dX = 0;
// let dY = 0;
let clones: any[] = [];

function cloneFace() {
  for (let i = 0; i < numSteps - 1; i++) {
    // pop these kids into the clones array. numSteps-1 'cause 1 already exists in the DOM
    if (face === null) return;
    clones.push(face.cloneNode(true));
  }

  let parentFace = face; // the original
  let parentTxt = txt; // the original

  clones.forEach((clone, i) => {
    clone.dataset.face = `face--${i + 2}`; // increment the new data attributes
    clone.querySelector('.txt').dataset.txt = `txt--${i + 2}`; // increment the new data attributes
    if (parentFace !== null) {
      parentFace.appendChild(clone);
      parentFace = clone; // original is the new black
    }
  });
}

function clipYourFace() {
  for (let i = 0; i < numSteps; i++) {
    let yPos = stepHeight * i;
    G.set(`[data-txt="txt--${i + 1}"]`, {
      clipPath: `polygon(0 ${yPos}%, 100% ${yPos}%, 100% ${
        yPos + stepHeight + 0.4
      }%, 0 ${yPos + stepHeight + 0.4}%)`,
    });
  }
}

cloneFace();
clipYourFace();

G.set('.container', { autoAlpha: 1 });
G.set('.scene', { transformOrigin: 'center center -400px' });

let gtl = G.timeline({
  delay: 1,
  repeat: -1,
  repeatDelay: 0,
  defaults: {
    ease: 'power4.inOut',
  },
});

function stepText(tEase: any, angle: any) {
  let tl = G.timeline();

  for (let step = 0; step < numSteps - 1; step++) {
    let dir = -1;

    if (step % 2 == 0) {
      dir = 1; // which way am I going? Up or down?
    }
    tl.to(
      `[data-face="face--${step + 2}"]`,
      {
        rotationX: function () {
          if (angle != 0) {
            angle = stepAngle * dir;
          }
          return angle;
        },
        color: function () {
          let stepColor = '#fff';
          if (step % 2 == 0 && angle != 0) {
            stepColor = '#d7d7d7';
          }
          return stepColor;
        },
        ease: tEase,
        transformOrigin: `50% ${stepHeight * step + stepHeight}%`,
        duration: 1.2,
      },
      `0.${step}`
    );
  }

  return tl;
}

gtl.add(stepText('elastic', 1)).add(stepText('elastic', 0));

// calc = 計算
const calcOffset = (xPos: number, yPos: number): number[] => {
  let winW = window.innerWidth;
  let winH = window.innerHeight;
  let dX = (2 * (xPos - winW / 2)) / winW;
  let dY = (-2 * (yPos - winH / 2)) / winH;
  return [dX, dY];
};

/**
 *
 * <div class="container">
 *   <div class="scene">
 *     <div class="word">
 *       <div class="face" data-face="face--1">
 *         <p class="txt" data-txt="txt--1">gsap
 *         </p>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
 */

// rotate = 回転する
const rotateTxt = (xPos: number, yPos: number) => {
  const [nX, nY] = calcOffset(xPos, yPos); // get cursor position from center 1-0-1
  // let nX = nPos[0];
  // let nY = nPos[1];
  let invertedRangeX = 1 - Math.sqrt(nX * nX); // 0-1-0
  let invertedRangeY = 1 - Math.sqrt(nY * nY); // 0-1-0
  G.to('.scene', {
    rotationX: nY * 30,
    rotationY: nX * 30,
    rotation: nX * 40,
    duration: 1,
    ease: 'sine',
  });
  /**
   * txtの移動
   */
  G.to('.txt', {
    fontStretch: `${200 - 200 * invertedRangeY}%`,
    fontWeight: invertedRangeX * 900,
    duration: 1,
  });
};

/**
 * innerHeightは指定した要素の高さを取得する(paddingとmarginは取得しない。)
 */
const pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

/** mouse event時
 * @see https://qiita.com/yukiB/items/31a9e9e600dfb1f34f76
 * clientX or Y ブラウザウィンドウ内でのカーソル座標を取得．ウィンドウの左上が常に (0, 0) の座標となる．
 */
window.addEventListener('mousemove', function (event) {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  rotateTxt(pointer.x, pointer.y);
});
