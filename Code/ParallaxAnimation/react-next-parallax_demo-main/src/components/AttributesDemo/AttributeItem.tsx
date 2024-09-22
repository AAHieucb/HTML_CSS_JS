// react
import { FC } from 'react';

// ract-next-parallax
import { Parallax, AnimationMode } from 'react-next-parallax';

// components
import Mushroom from './Scenes/Mushroom';
import PinWheel from './Scenes/PinWheel';
import Cemetry from './Scenes/Cemetry';
import Pyramids from './Scenes/Pyramids';
import Portal from './Scenes/Portal';

// types

import { Attribute, SceneType } from '../../types/types';
interface AttributeItemProps {
  type: SceneType;
  animationMode: AnimationMode;
  reverse: boolean;
  attribute: Attribute;

  offsetMultiplier: number;
}

const AttributeItem = ({
  type,
  animationMode,
  reverse,
  attribute,
  offsetMultiplier,
}: AttributeItemProps) => {
  let Scene: FC<{ type: SceneType }>;

  switch (attribute) {
    case 'offset':
      Scene = Pyramids;
      break;
    case 'opacity':
      Scene = Cemetry;
      break;
    case 'scale':
      Scene = Mushroom;
      break;
    case 'rotation':
      Scene = PinWheel;
      break;
    case 'skew':
    default:
      Scene = Portal;
      break;
  }

  return (
    <Parallax
      key={attribute + '-' + String(+reverse)}
      borderRadius="16px"
      lineGlareEnable={false}
      spotGlareEnable={false}
      animationMode={animationMode}
      shadow="0 0 2rem rgba(0,0,0,0.6)"
      offsetMultiplier={offsetMultiplier}
      animationReverse={reverse ? 'all-except-offset' : undefined}
      className="mx-auto w-[80%] sm:w-[95%] md:w-full xl:w-[900px]"
      aria-hidden="true"
    >
      <Scene type={type} />
    </Parallax>
  );
};

export default AttributeItem;

{
  /* <div
                className="pointer-events-none grid h-full backface-hidden"
                style={{
                  transformStyle: parallax ? 'preserve-3d' : undefined,
                  borderRadius: !parallax ? borderRadius : undefined,
                  overflow: !parallax ? 'hidden' : undefined,
                }}
                aria-hidden="true"
              >
                <img
                  src="images/parallax/bg.webp"
                  className="col-start-1 col-end-1 row-start-1 row-end-1 inline-block h-full w-full"
                  style={{
                    borderRadius: parallax ? borderRadius : undefined,
                  }}
                  alt="background"
                />
                <img
                  src="images/parallax/flower.webp"
                  className="col-start-1 col-end-1 row-start-1 row-end-1 translate-z-16 transform"
                  alt="flower"
                />
                <img
                  src="images/parallax/text.webp"
                  className="col-start-1 col-end-1 row-start-1 row-end-1 translate-z-36 transform"
                  alt="Saffron"
                />
              </div> */
}
