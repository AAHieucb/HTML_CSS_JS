// config
import { base } from '../../../config/config';

// types
import { SceneType } from '../../../types/types';

const Pyramids = ({ type }: { type: SceneType }) => {
  let className: string;
  switch (type) {
    case 'long':
      className =
        'aspect-[2.25] [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-top-[15%] [&>*]:h-[130%] w-full';
      break;
    case 'short1':
      className =
        'aspect-[1.8] [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-top-[11%] [&>*]:h-[122%] w-full';
      break;
    case 'short2':
    default:
      className =
        'aspect-[3/4] [&>*]:-left-[40%] [&>*]:-top-[11%] [&>*]:h-[122%]';
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
        src={`${base}/images/pyramids/01.webp`}
      />
      <img
        data-parallax-offset="-3.5"
        src={`${base}/images/pyramids/02.webp`}
      />
      <img
        data-parallax-offset="-2.5"
        src={`${base}/images/pyramids/03.webp`}
      />
      <img
        data-parallax-offset="-1.5"
        src={`${base}/images/pyramids/04.webp`}
      />
      <img
        data-parallax-offset="-0.5"
        src={`${base}/images/pyramids/05.webp`}
      />
      <img data-parallax-offset="0.5" src={`${base}/images/pyramids/06.webp`} />
      <img data-parallax-offset="1.5" src={`${base}/images/pyramids/07.webp`} />
      <img data-parallax-offset="2.5" src={`${base}/images/pyramids/08.webp`} />
      <img data-parallax-offset="3.5" src={`${base}/images/pyramids/09.webp`} />
      <img data-parallax-offset="4.5" src={`${base}/images/pyramids/10.webp`} />
      <div
        data-parallax-offset="8"
        data-parallax-opacity="0;1"
        className="flex w-full items-center justify-center font-inter"
      >
        <p
          className={
            'text-[50px] font-bold leading-[1] text-white md:text-[60px] lg:text-[70px]' +
            (type === 'short2' ? ' hidden' : '')
          }
          style={{ filter: 'drop-shadow(0 0 0.5rem rgba(0,0,0,0.5))' }}
        >
          Next Parallax
        </p>
      </div>
    </div>
  );
};

export default Pyramids;
