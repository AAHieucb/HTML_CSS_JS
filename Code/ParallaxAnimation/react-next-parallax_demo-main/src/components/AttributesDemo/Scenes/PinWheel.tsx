// config
import { base } from '../../../config/config';

// types
import { SceneType } from '../../../types/types';

const PinWheel = ({ type }: { type: SceneType }) => {
  let className: string;

  switch (type) {
    case 'long':
      className =
        'aspect-[2.25] [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-top-[10%] [&>*]:h-[120%] w-full';
      break;
    case 'short1':
      className =
        'aspect-[1.8] [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-top-[5%] [&>*]:h-[110%] w-full';
      break;
    case 'short2':
    default:
      className =
        'aspect-[3/4] [&>*]:-left-[147%] [&>*]:-top-[9%] [&>*]:h-[118%]';
  }

  return (
    <div
      className={
        `pointer-events-none relative rounded-xl [&>*]:absolute [&>*]:max-w-none ` +
        className
      }
    >
      <img
        data-parallax-offset="-4.5"
        src={`${base}/images/pinwheel/01.webp`}
      />
      <img data-parallax-offset="-2" src={`${base}/images/pinwheel/02.webp`} />
      <img data-parallax-offset="-1" src={`${base}/images/pinwheel/03.webp`} />
      <img data-parallax-offset="1" src={`${base}/images/pinwheel/04.webp`} />
      <img data-parallax-offset="2" src={`${base}/images/pinwheel/05.webp`} />
      <img data-parallax-offset="2" src={`${base}/images/pinwheel/08.webp`} />
      <img data-parallax-offset="4.5" src={`${base}/images/pinwheel/06.webp`} />
      <img data-parallax-offset="4.5" src={`${base}/images/pinwheel/07.webp`} />

      <img
        data-parallax-offset="4.5"
        src={`${base}/images/pinwheel/pole.webp`}
      />
      <img
        data-parallax-offset="4.5"
        data-parallax-rotation="0;1800"
        src={`${base}/images/pinwheel/pinwheel.webp`}
        className="origin-[50%_51.5%]"
      />
    </div>
  );
};

export default PinWheel;
