// react
import { useRef } from 'react';

// config
import { base } from '../config/config';

// types
interface ParallaxItemProps {
  parallax: boolean;
  borderRadius: string;
  disabled: boolean;
  type: 'long' | 'short1' | 'short2';
}

const ParallaxItem = ({
  parallax,
  borderRadius,
  disabled,
  type,
}: ParallaxItemProps) => {
  //ref
  const ref = useRef<HTMLDivElement>(null);

  let className: string;

  switch (type) {
    case 'long':
      className =
        '[&>*]:-left-[5%] [&>*]:-top-[5%] [&>*]:h-[110%] [&>*]:w-[110%]';
      break;
    case 'short1':
      className = '[&>*]:-left-[16.5%] [&>*]:-top-[5%] [&>*]:h-[110%]';
      break;
    case 'short2':
    default:
      className = '[&>*]:-left-[58%] [&>*]:-top-[5%] [&>*]:h-[110%]';
  }

  return (
    <div
      ref={ref}
      className={
        `pointer-events-none relative aspect-[9/4] h-full transform-style-3d [&>*]:absolute [&>*]:max-w-none ` +
        className
      }
      style={{
        borderRadius,
      }}
    >
      <img
        data-parallax-offset={parallax ? '-4.5' : undefined}
        src={`${base}/images/balloon/01.webp`}
      />
      <img
        data-parallax-offset={parallax ? '-2.5' : undefined}
        src={`${base}/images/balloon/02.webp`}
      />

      <img
        src={`${base}/images/balloon/03.webp`}
        className={disabled ? '' : 'animate-float'}
      />
      <img
        data-parallax-offset={parallax ? '2' : undefined}
        src={`${base}/images/balloon/04.webp`}
      />
      <img
        data-parallax-offset={parallax ? '4' : undefined}
        src={`${base}/images/balloon/05.webp`}
      />
      <img
        data-parallax-opacity="0;1"
        data-parallax-offset={parallax ? '5' : undefined} 
        src={`${base}/images/balloon/06.webp`}
        className={disabled ? '' : 'animate-float2'}
      />
    </div>
  );
};

export default ParallaxItem;
