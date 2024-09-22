// config
import { base } from '../../../config/config';

// types
import { SceneType } from '../../../types/types';

const Pyramids = ({ type }: { type: SceneType }) => {
  let className: string;

  switch (type) {
    case 'long':
      className =
        'aspect-[2.25] [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-top-[7.5%] [&>*]:h-[115%] w-full';
      break;
    case 'short1':
      className =
        'aspect-[1.8] [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-top-[5%] [&>*]:h-[110%] w-full';
      break;
    case 'short2':
    default:
      className =
        'aspect-[3/4] [&>*]:-left-[173%] [&>*]:-top-[5%] [&>*]:h-[110%]';
  }

  return (
    <div
      className={
        `pointer-events-none relative rounded-xl [&>*]:absolute [&>*]:max-w-none ` +
        className
      }
    >
      <img data-parallax-offset="-4.5" src={`${base}/images/portal/01.webp`} />
      <img data-parallax-offset="-2.5" src={`${base}/images/portal/02.webp`} />
      <img data-parallax-offset="-1" src={`${base}/images/portal/03.webp`} />
      <img data-parallax-offset="0" src={`${base}/images/portal/04.webp`} />

      <img data-parallax-offset="2.5" src={`${base}/images/portal/05.webp`} />
      <img
        data-parallax-offset="2.5"
        data-parallax-skew="15;-15"
        style={{ transformOrigin: '60% 50%' }}
        src={`${base}/images/portal/portal.webp`}
      />
      <img data-parallax-offset="4.5" src={`${base}/images/portal/06.webp`} />
    </div>
  );
};

export default Pyramids;
