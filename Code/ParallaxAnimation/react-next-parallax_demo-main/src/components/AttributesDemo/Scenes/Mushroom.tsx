// config
import { base } from '../../../config/config';

// types
import { SceneType } from '../../../types/types';

const Mushroom = ({ type }: { type: SceneType }) => {
  let className: string;

  switch (type) {
    case 'long':
      className =
        'aspect-[2.25] [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-top-[15%] [&>*]:h-[130%] w-full';
      break;
    case 'short1':
      className =
        'aspect-[1.8] [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-top-[5%] [&>*]:h-[110%] w-full';
      break;
    case 'short2':
    default:
      className =
        'aspect-[3/4] [&>*]:-left-[116%] [&>*]:-top-[11%] [&>*]:h-[122%]';
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
        src={`${base}/images/mushroom/01.webp`}
      />
      <img data-parallax-offset="-2" src={`${base}/images/mushroom/02.webp`} />
      <img data-parallax-offset="-1" src={`${base}/images/mushroom/03.webp`} />
      <img data-parallax-offset="0" src={`${base}/images/mushroom/04.webp`} />
      <img data-parallax-offset="1" src={`${base}/images/mushroom/05.webp`} />
      <img data-parallax-offset="2" src={`${base}/images/mushroom/06.webp`} />
      <img
        data-parallax-offset="2"
        data-parallax-scale="0.3;1"
        className="origin-[50%_72%]"
        src={`${base}/images/mushroom/mushroom.webp`}
      />
      <img data-parallax-offset="4.5" src={`${base}/images/mushroom/07.webp`} />
    </div>
  );
};

export default Mushroom;
