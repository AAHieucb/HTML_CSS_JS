// react
import { useEffect, useState } from 'react';

// react-responsive
import { useMediaQuery } from 'react-responsive';

// react-router-dom
import { Link, Navigate } from 'react-router-dom';

// components
import AttributeInfo from '../components/AttributesDemo/AttributeInfo/AttributeInfo';
import AttributeItem from '../components/AttributesDemo/AttributeItem';
import AttributeItemHeader from '../components/AttributesDemo/AttributeItemHeader';
import Footer from '../components/Footer';

// types
import { AnimationMode } from 'react-next-parallax';
import { Attribute } from '../types/types';
interface AttributesDemoProps {
  attribute?: Attribute;
}

function AttributesDemo({ attribute }: AttributesDemoProps) {
  // state
  const [animationMode, setAnimationMode] =
    useState<AnimationMode>('center-to-edge');
  const [reverse, setReverse] = useState(false);
  const [offsetMultiplier, setOffsetMultiplier] = useState(1);

  // media queries
  const isSmall = useMediaQuery({ query: '(min-width: 640px)' });
  const isLarge = useMediaQuery({ query: '(min-width: 768px)' });

  useEffect(() => {
    setAnimationMode(
      attribute === 'rotation' || attribute === 'skew'
        ? 'edge-to-edge-x'
        : 'center-to-edge'
    );
    setReverse(false);
    setOffsetMultiplier(1);
  }, [attribute]);

  if (!attribute) {
    return <Navigate to="/attributes/offset" />;
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-start bg-slate-300 bg-[url('/images/p-bg.webp')] bg-contain bg-fixed bg-left bg-no-repeat py-4 font-inter text-sm xs:text-base">
      <div className="mx-auto inline-flex flex-grow flex-col items-stretch justify-start">
        <header className="mx-auto w-[95%] md:w-full [&_label]:mr-2 [&_label]:text-slate-600 [&_label]:drop-shadow-[0_0_0.25rem_rgba(255,255,255,0.8)] md:[&_label]:mr-1 lg:[&_label]:mr-2 [&_select]:flex-grow [&_select]:rounded-full [&_select]:border-[1px] [&_select]:border-slate-100/50 [&_select]:bg-slate-100/80 [&_select]:px-1 [&_select]:text-slate-600 [&_select]:outline-0 focus-within:[&_select]:outline-1">
          <div className="z-1 relative mx-auto flex flex-wrap items-center justify-center gap-4 rounded-xl border-[1px] border-slate-100/50 bg-slate-200 p-4 text-sm sm:gap-6 lg:gap-x-8 lg:px-8 lg:text-[0.925rem] [&>div]:flex [&_.active]:bg-emerald-500 [&_.active]:scale-[1.2] [&_a:not(.active)]:will-change-transform hover:[&_a:not(.active)]:bg-emerald-300/50 hover:[&_a:not(.active)]:shadow-[0_0_0.5rem_rgba(0,0,0,0.1)] hover:[&_a:not(.active)]:scale-[1.1] [&_a]:rounded-xl [&_a]:border-[1px] [&_a]:border-slate-100/70 [&_a]:bg-slate-400/40 [&_a]:px-5 [&_a]:py-2 [&_a]:font-bold [&_a]:text-white [&_a]:shadow-[0_0_0.5rem_rgba(0,0,0,0.05)] [&_a]:transition-all [&_a]:duration-300">
            <h1 className="sr-only">Next-Parallax Attributes Demo</h1>
            <h2 className="mr-auto hidden text-3xl font-bold leading-[0] text-slate-500/60 xl:block">
              Attribute :
            </h2>
            <Link
              to={`/attributes/offset`}
              className={attribute === 'offset' ? 'active' : undefined}
            >
              Offset
            </Link>
            <Link
              to={`/attributes/opacity`}
              className={attribute === 'opacity' ? 'active' : undefined}
            >
              Opacity
            </Link>
            <Link
              to={`/attributes/scale`}
              className={attribute === 'scale' ? 'active' : undefined}
            >
              Scale
            </Link>
            <Link
              to={`/attributes/rotation`}
              className={attribute === 'rotation' ? 'active' : undefined}
            >
              Rotation
            </Link>
            <Link
              to={`/attributes/skew`}
              className={attribute === 'skew' ? 'active' : undefined}
            >
              Skew
            </Link>
          </div>
        </header>
        <main className="mb-[56px] flex flex-grow flex-col items-stretch justify-start pt-20 md:mb-0">
          <AttributeInfo attribute={attribute} />
          <AttributeItemHeader
            attribute={attribute}
            animationMode={attribute !== 'offset' ? animationMode : undefined}
            setAnimationMode={setAnimationMode}
            reverse={attribute !== 'offset' ? reverse : undefined}
            setReverse={setReverse}
            offsetMultiplier={offsetMultiplier}
            setOffsetMultiplier={setOffsetMultiplier}
          />
          <AttributeItem
            type={isLarge ? 'long' : isSmall ? 'short1' : 'short2'}
            animationMode={animationMode}
            reverse={reverse}
            offsetMultiplier={offsetMultiplier}
            attribute={attribute}
          />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AttributesDemo;
