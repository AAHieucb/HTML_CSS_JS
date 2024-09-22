// config
import { base } from '../../../config/config';

// types
import { SceneType } from '../../../types/types';

const Cemetry = ({ type }: { type: SceneType }) => {
  let className: string;

  switch (type) {
    case 'long':
      className =
        'aspect-[2.25] [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-top-[12%] [&>*]:h-[124%] w-full';
      break;
    case 'short1':
      className =
        'aspect-[2] [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-top-[11%] [&>*]:h-[122%] w-full';
      break;
    case 'short2':
    default:
      className =
        'aspect-[3/4] [&>*]:-left-[150%] [&>*]:-top-[11%] [&>*]:h-[122%]';
  }

  return (
    <div
      className={
        `pointer-events-none relative [&>*]:absolute [&>*]:max-w-none ` +
        className
      }
    >
      <img data-parallax-offset="-4.5" src={`${base}/images/cemetry/01.webp`} />
      <img data-parallax-offset="-3.5" src={`${base}/images/cemetry/02.webp`} />
      <img data-parallax-offset="-2.5" src={`${base}/images/cemetry/03.webp`} />
      <img data-parallax-offset="1" src={`${base}/images/cemetry/04.webp`} />
      <img data-parallax-offset="0" src={`${base}/images/cemetry/05.webp`} />
      <img
        data-parallax-offset="0"
        data-parallax-opacity="0;1"
        src={`${base}/images/cemetry/05_eyes.webp`}
      />
      <img data-parallax-offset="1" src={`${base}/images/cemetry/06.webp`} />
      <img data-parallax-offset="2.5" src={`${base}/images/cemetry/07.webp`} />
      <img
        data-parallax-offset="2.5"
        data-parallax-opacity="0;1"
        src={`${base}/images/cemetry/07_ghost.webp`}
      />
      <img
        data-parallax-offset="3.5"
        data-parallax-opacity="0;1"
        src={`${base}/images/cemetry/08.webp`}
      />
      <img
        data-parallax-offset="4.5"
        data-parallax-opacity="0;1"
        src={`${base}/images/cemetry/09.webp`}
      />
    </div>
  );
};

export default Cemetry;
