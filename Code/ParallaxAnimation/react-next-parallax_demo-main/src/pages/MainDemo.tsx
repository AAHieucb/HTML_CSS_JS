// react
import { useRef, useState, useCallback } from 'react';

// react-responsive
import { useMediaQuery } from 'react-responsive';

// components
import { Parallax, SpotGlarePosition, ParallaxRef } from 'react-next-parallax';
import ParallaxItem from '../components/ParallaxItem';
import Footer from '../components/Footer';

// utility
import { animate } from '../utility/utility';

// types
type LineGlare = 'on-blur' | 'on-no-blur' | 'off';
type SpotGlare =
  | 'on-top'
  | 'on-right'
  | 'on-bottom'
  | 'on-left'
  | 'on-all'
  | 'off';

function App() {
  // media queries
  // const isSmall = useMediaQuery({ query: '(min-width: 350px)' });
  const isLarge = useMediaQuery({ query: '(min-width: 640px)' });

  // states
  const [parallax, setParallax] = useState(true);
  const [scale, setScale] = useState(1.05);
  const [borderRadius, setBorderRadius] = useState('16px');
  const [spotGlare, setSpotGlare] = useState<SpotGlare>('on-top');
  const [lineGlare, setLineGlare] = useState<LineGlare>('off');
  const [disabled, setDisabled] = useState(false);
  const [reversed, setReversed] = useState(false);

  // refs
  const ref = useRef<ParallaxRef>(null);
  const logRef = useRef<HTMLParagraphElement>(null);
  const disableCheckbox = useRef<HTMLInputElement>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const xRef = useRef<HTMLInputElement>(null);
  const yRef = useRef<HTMLInputElement>(null);
  const animationIsRunning = useRef(false);

  // reset values
  if (animationIsRunning.current) animationIsRunning.current = false;
  if (xRef.current) xRef.current.value = '0';
  if (yRef.current) yRef.current.value = '0';

  // functions

  // shows the log and clears it after 1 second
  const showLog = useCallback((text: string): void => {
    if (logRef.current) {
      logRef.current.classList.remove('opacity-0');
      logRef.current.textContent = text;
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(
        () => logRef.current?.classList.add('opacity-0'),
        1000
      );
    }
  }, []);

  // resets the tilt scale
  const resetScale = useCallback(() => {
    if (scale !== 1)
      setTimeout(() => {
        if (ref.current && xRef.current && yRef.current) {
          ref.current.tilt({
            angleX: Number(xRef.current.value),
            angleY: Number(yRef.current.value),
          });
        }
      }, 10);
  }, [scale]);

  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-start bg-slate-300 bg-[url('/images/p-bg.webp')] bg-contain bg-fixed bg-left bg-no-repeat pb-4 pt-2 font-inter text-sm xs:text-base">
      <header className="w-[95%] md:w-auto [&_label]:mr-2 [&_label]:text-slate-600 [&_label]:drop-shadow-[0_0_0.25rem_rgba(255,255,255,0.8)] md:[&_label]:mr-1 lg:[&_label]:mr-2 [&_select]:flex-grow [&_select]:rounded-full [&_select]:border-[1px] [&_select]:border-slate-100/50 [&_select]:bg-slate-100/80 [&_select]:px-1 [&_select]:text-slate-600 [&_select]:outline-0 focus-within:[&_select]:outline-1">
        <div className="z-1 relative mx-auto flex flex-col gap-x-3 gap-y-4 rounded-xl border-[1px] border-slate-100/50 bg-slate-200 p-4 md:flex-row md:text-sm lg:gap-x-8 lg:px-8 lg:text-[0.925rem] [&>div]:flex">
          <h1 className="sr-only">Next-Parallax Demo</h1>
          <div>
            <label htmlFor="border-radius">Border Radius :</label>
            <select
              id="border-radius"
              onChange={(e) => setBorderRadius(e.target.value)}
              defaultValue={borderRadius}
            >
              <option value="0">0px</option>
              <option value="8px">8px</option>
              <option value="16px">16px</option>
              <option value="48px">48px</option>
              <option value="50%">50%</option>
            </select>
          </div>
          <div>
            <label htmlFor="spot-glare">Spot Glare :</label>
            <select
              id="spot-glare"
              onChange={(e) => setSpotGlare(e.target.value as SpotGlare)}
              defaultValue={String(spotGlare)}
            >
              <option value="on-top">Top</option>
              <option value="on-bottom">Bottom</option>
              <option value="on-left">Left</option>
              <option value="on-right">Right</option>
              <option value="on-all">All</option>
              <option value="off">Off</option>
            </select>
          </div>
          <div>
            <label htmlFor="line-glare">Line Glare :</label>
            <select
              id="line-glare"
              onChange={(e) => setLineGlare(e.target.value as LineGlare)}
              defaultValue={String(lineGlare)}
            >
              <option value="on-blur">On - blur</option>
              <option value="on-no-blur">On - no blur</option>
              <option value="off">Off</option>
            </select>
          </div>
          <div>
            <label htmlFor="scale">Scale :</label>
            <select
              id="scale"
              onChange={(e) => setScale(Number(e.target.value))}
              defaultValue={scale}
            >
              <option value="1">1</option>
              <option value="1.05">1.05</option>
              <option value="1.1">1.1</option>
              <option value="1.2">1.2</option>
            </select>
          </div>
        </div>
        <div className="mx-auto -mt-[1px] flex w-[90%] flex-col-reverse items-start justify-between gap-y-[0.65rem] rounded-b-lg border-[1px] border-slate-100/50 bg-[rgb(214,222,232)] px-3 pb-3 pt-[13px] text-xs text-slate-700 xs:px-4 xs:text-base md:w-[95%] md:flex-row md:pb-1 md:pt-[5px] md:text-sm lg:items-center lg:pb-[6px] lg:pt-[7px]">
          <div className="flex w-full gap-x-2 opacity-80 md:w-auto">
            Event :
            <span
              ref={logRef}
              className="transition-opacity duration-500"
            ></span>
          </div>
          <div className="flex w-full flex-col items-stretch justify-between gap-x-4 gap-y-[0.65rem] md:w-auto md:flex-row md:items-center md:justify-center md:gap-y-0 lg:gap-x-4">
            <div className="flex items-center justify-between gap-x-4">
              <div className="flex items-center justify-center">
                <label htmlFor="parallax">Parallax :</label>
                <input
                  ref={disableCheckbox}
                  id="parallax"
                  type="checkbox"
                  defaultChecked={parallax}
                  onChange={() => setParallax((prev) => !prev)}
                />
              </div>
              <div className="flex items-center justify-center">
                <label htmlFor="reversed">Reversed :</label>
                <input
                  ref={disableCheckbox}
                  id="reversed"
                  type="checkbox"
                  defaultChecked={reversed}
                  onChange={() => setReversed((prev) => !prev)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-x-4">
              <div className="flex items-center justify-center">
                <label htmlFor="disabled">Disabled :</label>
                <input
                  ref={disableCheckbox}
                  id="disabled"
                  type="checkbox"
                  defaultChecked={disabled}
                  onChange={() => setDisabled((prev) => !prev)}
                />
              </div>
              <button
                className="relative overflow-hidden rounded-full border-emerald-200/50 bg-emerald-400 px-5 py-1 text-xs font-bold text-slate-100 transition-all duration-500 before:absolute before:bottom-0 before:right-0 before:top-0 before:w-0 before:rounded-full before:bg-emerald-500 before:shadow-[inset_0_0_1px_2px_rgba(255,255,255,0.2)] before:transition-[width] before:duration-500 hover:bg-emerald-500 hover:shadow-[0_0_2px_2px_#022c2211] before:hover:left-0 before:hover:right-[unset] before:hover:w-full xs:text-sm md:px-3 md:text-xs"
                onClick={() => {
                  document
                    .querySelectorAll<HTMLSelectElement>('select')
                    .forEach((ele) => {
                      ele.disabled = true;
                    });
                  document
                    .querySelectorAll<HTMLInputElement>('input')
                    .forEach((ele) => {
                      ele.disabled = true;
                    });
                  let restoreDisableState = false;
                  if (disableCheckbox.current) {
                    if (disableCheckbox.current.checked) {
                      restoreDisableState = true;
                      disableCheckbox.current.checked = false;
                      setDisabled((prev) => !prev);
                    }
                    disableCheckbox.current.disabled = true;
                  }
                  animate(ref, animationIsRunning, () => {
                    if (disableCheckbox.current) {
                      disableCheckbox.current.disabled = false;
                      if (restoreDisableState) {
                        disableCheckbox.current.checked = true;
                        setDisabled((prev) => !prev);
                      }
                    }
                    document
                      .querySelectorAll<HTMLSelectElement>('select')
                      .forEach((ele) => {
                        ele.disabled = false;
                      });
                    document
                      .querySelectorAll<HTMLInputElement>('input')
                      .forEach((ele) => {
                        ele.disabled = false;
                      });
                  });
                }}
              >
                <span className="relative z-[1]">Animate</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="mb-[40px] mt-10 inline-grid max-w-[95%] flex-grow place-content-center gap-[6px] md:mb-0 md:max-w-[90%]">
        <div className="flex min-w-[265px] items-center justify-center xs:min-w-[340px]">
          <div className="relative mb-[40px] sm:max-w-[87%] md:mb-[80px] md:max-w-full">
            <Parallax
              key={String(+parallax)}
              ref={ref}
              borderRadius={borderRadius}
              spotGlareEnable={spotGlare !== 'off'}
              spotGlarePosition={spotGlare.split('-')[1] as SpotGlarePosition}
              lineGlareEnable={lineGlare !== 'off'}
              lineGlareBlurEnable={lineGlare === 'on-blur'}
              aria-hidden="true"
              disabled={disabled}
              scale={scale}
              tiltReverse={reversed}
              onTilt={(e) => {
                showLog(
                  `onTilt() - X: ${e.angleX.toFixed(
                    2
                  )}° | Y: ${e.angleY.toFixed(2)}°`
                );
                if (xRef.current) xRef.current.value = e.angleX.toFixed(2);
                if (yRef.current) yRef.current.value = e.angleY.toFixed(2);
              }}
              onMouseLeave={() => {
                if (xRef.current) xRef.current.value = '0';
                if (yRef.current) yRef.current.value = '0';
              }}
              onTouchEnd={() => {
                if (xRef.current) xRef.current.value = '0';
                if (yRef.current) yRef.current.value = '0';
              }}
              className="h-[250px] w-[200px] max-w-full xs:h-[340px] xs:w-[270px] sm:h-[420px] sm:w-[600px] lg:h-auto lg:w-[700px] xl:aspect-[9/4] xl:w-[900px]"
            >
              <ParallaxItem
                parallax={parallax}
                borderRadius={borderRadius}
                disabled={disabled}
                type={isLarge ? 'long' : 'short1'}
              />
            </Parallax>
            <input
              aria-label="Angle X"
              name="angle-x"
              ref={xRef}
              type="range"
              className="absolute -left-[140px] top-1/2 h-4 w-[200px] appearance-none bg-transparent -translate-y-1/2 disabled:grayscale-[70%] md:pointer-events-auto md:-left-[180px] [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-emerald-400 [&::-moz-range-thumb]:shadow-[inset_0_0_1px_3px_rgba(0,0,0,0.05)] hover:[&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:disabled:cursor-default [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:border-[1px] [&::-moz-range-track]:border-solid [&::-moz-range-track]:border-slate-500/40 [&::-moz-range-track]:bg-slate-100 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:border-[1px] [&::-webkit-slider-runnable-track]:border-solid [&::-webkit-slider-runnable-track]:border-slate-500/40 [&::-webkit-slider-runnable-track]:bg-slate-100 [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:top-1/2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:shadow-[inset_0_0_1px_3px_rgba(0,0,0,0.05)] [&::-webkit-slider-thumb]:-translate-y-1/2 hover:[&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:disabled:cursor-default hover:[&:not(:disabled)::-moz-range-thumb]:brightness-95 hover:[&:not(:disabled)::-moz-range-thumb]:drop-shadow-[0_0_2px_rgba(0,150,0,0.3)] [&:not(:disabled)::-moz-range-thumb]:active:brightness-105 [&:not(:disabled)::-moz-range-track]:active:brightness-105 hover:[&:not(:disabled)::-webkit-slider-runnable-track]:brightness-95 [&:not(:disabled)::-webkit-slider-runnable-track]:active:brightness-105 hover:[&:not(:disabled)::-webkit-slider-thumb]:brightness-95 hover:[&:not(:disabled)::-webkit-slider-thumb]:drop-shadow-[0_0_2px_rgba(0,150,0,0.3)] [&:not(:disabled)::-webkit-slider-thumb]:active:brightness-105"
              style={{
                transform: 'rotate(-90deg)',
              }}
              disabled={disabled}
              min={-20}
              max={20}
              step={0.1}
              onChange={(e) => {
                if (ref.current && yRef.current)
                  ref.current.tilt(
                    {
                      angleX: Number(e.target.value),
                      angleY: Number(yRef.current.value),
                    },
                    true
                  );
              }}
              onMouseUp={resetScale}
              onTouchStart={() =>
                document.body.classList.add('overflow-hidden')
              }
              onTouchEnd={() => {
                resetScale();
                document.body.classList.remove('overflow-hidden');
              }}
              defaultValue={0}
            />
            <input
              aria-label="Angle Y"
              ref={yRef}
              type="range"
              name="angle-y"
              className="absolute -bottom-[43px] left-1/2 h-4 w-[200px] appearance-none bg-transparent -translate-x-1/2 disabled:grayscale-[70%] md:-bottom-[80px] [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-emerald-400 [&::-moz-range-thumb]:shadow-[inset_0_0_1px_3px_rgba(0,0,0,0.05)] hover:[&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:disabled:cursor-default [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:border-[1px] [&::-moz-range-track]:border-solid [&::-moz-range-track]:border-slate-500/40 [&::-moz-range-track]:bg-slate-100 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:border-[1px] [&::-webkit-slider-runnable-track]:border-solid [&::-webkit-slider-runnable-track]:border-slate-500/40 [&::-webkit-slider-runnable-track]:bg-slate-100 [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:top-1/2 [&::-webkit-slider-thumb]:ml-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:shadow-[inset_0_0_1px_3px_rgba(0,0,0,0.05)] [&::-webkit-slider-thumb]:-translate-y-1/2 hover:[&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:disabled:cursor-default hover:[&:not(:disabled)::-moz-range-thumb]:brightness-95 hover:[&:not(:disabled)::-moz-range-thumb]:drop-shadow-[0_0_2px_rgba(0,150,0,0.3)] [&:not(:disabled)::-moz-range-thumb]:active:brightness-105 [&:not(:disabled)::-moz-range-track]:active:brightness-105 hover:[&:not(:disabled)::-webkit-slider-runnable-track]:brightness-95 [&:not(:disabled)::-webkit-slider-runnable-track]:active:brightness-105 hover:[&:not(:disabled)::-webkit-slider-thumb]:brightness-95 hover:[&:not(:disabled)::-webkit-slider-thumb]:drop-shadow-[0_0_2px_rgba(0,150,0,0.3)] [&:not(:disabled)::-webkit-slider-thumb]:active:brightness-105"
              disabled={disabled}
              min={-20}
              max={20}
              step={0.1}
              onChange={(e) => {
                if (ref.current && xRef.current)
                  ref.current.tilt(
                    {
                      angleX: Number(xRef.current.value),
                      angleY: Number(e.target.value),
                    },
                    true
                  );
              }}
              onMouseUp={resetScale}
              onTouchStart={() =>
                document.body.classList.add('overflow-hidden')
              }
              onTouchEnd={() => {
                resetScale();
                document.body.classList.remove('overflow-hidden');
              }}
              defaultValue={0}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
