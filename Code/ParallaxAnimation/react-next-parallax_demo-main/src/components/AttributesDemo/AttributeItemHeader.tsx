// react
import { Dispatch, SetStateAction } from 'react';

// react-next-parallax
import { AnimationMode } from 'react-next-parallax';

// types
interface AttributeItemHeaderProps {
  attribute: string;
  animationMode?: AnimationMode;
  setAnimationMode?: Dispatch<SetStateAction<AnimationMode>>;
  reverse?: boolean;
  setReverse?: Dispatch<SetStateAction<boolean>>;
  offsetMultiplier: number;
  setOffsetMultiplier: Dispatch<SetStateAction<number>>;
}

const AttributeItemHeader = ({
  attribute,
  animationMode,
  setAnimationMode,
  reverse,
  setReverse,
  offsetMultiplier,
  setOffsetMultiplier,
}: AttributeItemHeaderProps) => {
  return (
    <div className="mx-auto mb-14 w-[95%] md:w-full [&_label]:mr-2 [&_label]:text-slate-600 [&_label]:drop-shadow-[0_0_0.25rem_rgba(255,255,255,0.8)] md:[&_label]:mr-1 lg:[&_label]:mr-2 [&_select]:flex-grow [&_select]:rounded-full [&_select]:border-[1px] [&_select]:border-slate-100/50 [&_select]:bg-slate-100/80 [&_select]:px-1 [&_select]:text-slate-600 [&_select]:outline-0 focus-within:[&_select]:outline-1">
      <div className="z-1 relative mx-auto flex flex-col justify-center gap-x-3 gap-y-4 rounded-xl border-[1px] border-slate-100/50 bg-slate-200 p-4 md:flex-row md:text-sm lg:gap-x-8 lg:px-8 lg:text-[0.925rem] [&>div]:flex">
        <div>
          <label htmlFor={`${attribute}-offset-multiplier`}>
            Offset Multiplier :
          </label>
          <select
            id={`${attribute}-offset-multiplier`}
            onChange={(e) => setOffsetMultiplier(+e.target.value)}
            value={String(offsetMultiplier)}
          >
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
          </select>
        </div>
        {reverse != undefined && setReverse && (
          <div>
            <label htmlFor={`${attribute}-reverse`}>Reverse :</label>
            <select
              id={`${attribute}-reverse`}
              onChange={(e) => setReverse(Boolean(+e.target.value))}
              value={reverse ? '1' : '0'}
            >
              <option value="0">false</option>
              <option value="1">true</option>
            </select>
          </div>
        )}
        {animationMode && setAnimationMode && (
          <div>
            <label htmlFor={`${attribute}-animation-mode`}>
              Animation Mode :
            </label>
            <select
              id={`${attribute}-animation-mode`}
              onChange={(e) =>
                setAnimationMode(e.target.value as AnimationMode)
              }
              value={animationMode}
            >
              <option value="center-to-edge">center-to-edge</option>
              <option value="edge-to-edge-x">edge-to-edge-x</option>
              <option value="edge-to-edge-y">edge-to-edge-y</option>
              <option value="edge-to-edge-both">edge-to-edge-both</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttributeItemHeader;
