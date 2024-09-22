// react
import { useEffect, useRef, useState } from 'react';

// react-responsive
import { useMediaQuery } from 'react-responsive';

// react-next-tilt
import { Parallax } from 'react-next-parallax';

// components
import ParallaxItem from '../components/ParallaxItem.tsx';
import Footer from '../components/Footer.tsx';

const ControlElementDemo = () => {
  // media query
  const isLarge = useMediaQuery({ query: '(min-width: 1024px)' });

  // state
  const [controlGroup1, setControlGroup1] = useState<boolean[]>([]);
  const [controlGroup2, setControlGroup2] = useState<boolean[]>([]);
  const [fullPageListening, setFullPageListening] = useState(false);
  const [controlElementOnly, setControlElementOnly] = useState(false);

  // ref
  const controlElement1 = useRef<HTMLDivElement>(null);
  const controlElement2 = useRef<HTMLDivElement>(null);
  const fullPageListeningCheckbox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const defaultControlGroup1 = Array(8).fill(false);
    const defaultControlGroup2 = Array(8).fill(false);
    for (let i = 0; i < 8; i++) {
      if (
        (i % 2 && i < (isLarge ? 4 : 2)) ||
        (!(i % 2) && i >= (isLarge ? 4 : 2))
      )
        defaultControlGroup2[i] = true;
      else defaultControlGroup1[i] = true;
    }
    setControlGroup1(defaultControlGroup1);
    setControlGroup2(defaultControlGroup2);
  }, [isLarge]);

  useEffect(() => {
    if (fullPageListening && fullPageListeningCheckbox.current) {
      const boundingBox =
        fullPageListeningCheckbox.current.getBoundingClientRect();
      document.dispatchEvent(
        new MouseEvent('mouseenter', {
          clientX: boundingBox.left,
          clientY: boundingBox.top,
        })
      );
      setTimeout(
        () =>
          document.dispatchEvent(
            new MouseEvent('mousemove', {
              clientX: boundingBox.left,
              clientY: boundingBox.top,
            })
          ),
        0
      );
    }
  }, [fullPageListening]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-x-16 gap-y-8 bg-slate-300 bg-[url('/images/p-bg.webp')] bg-contain bg-fixed bg-left bg-no-repeat pb-4 pt-8 font-inter">
      <header className="grid w-[360px] max-w-full grid-cols-2 gap-4 overflow-hidden lg:w-[848px]">
        <h1 className="sr-only">Next-Parallax Control Element Demo</h1>
        <div className="flex flex-col items-center justify-center self-end">
          <div className="mb-7 inline-grid grid-cols-2 gap-x-10 gap-y-2 rounded-xl border-[1px] border-slate-100/50 bg-slate-200 px-6 pb-3 pt-6 text-center text-slate-500 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-4">
            {[...Array(isLarge ? 8 : 4)].map((_, i) => (
              <div key={i} className="flex flex-col">
                <input
                  aria-label={`Toggle Element ${i + 1} for Control Element 1`}
                  name={'control-1-tilt-' + (i + 1)}
                  id={'control-1-tilt-' + (i + 1)}
                  type="checkbox"
                  checked={controlGroup1[i] || false}
                  onChange={() => {
                    setControlGroup1(
                      controlGroup1.map((_, j) =>
                        j !== i ? controlGroup1[j] : !controlGroup1[i]
                      )
                    );
                  }}
                />
                <label
                  htmlFor={'control-1-tilt-' + (i + 1)}
                  className="select-none"
                >
                  {i + 1}
                </label>
              </div>
            ))}
          </div>
          <div className="flex w-full items-center justify-center rounded-xl border-[1px] border-slate-100/50 bg-slate-200 py-2 leading-[1rem] text-slate-600/90 lg:w-[200px]">
            <label htmlFor="control-element-only" className="select-none">
              Control Ele. Only:
            </label>
            <input
              type="checkbox"
              name="control-element-only"
              id="control-element-only"
              className="ml-1"
              checked={controlElementOnly}
              onChange={() => setControlElementOnly((prev) => !prev)}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className={
              'h-[130px] w-[130px] select-none rounded-lg border-2 border-[rgb(180,190,200)] bg-[rgb(190,200,210)] lg:h-[150px] lg:w-[150px]' +
              (fullPageListening ? ' brightness-105' : ' cursor-pointer')
            }
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='%23999' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
            ref={controlElement1}
          />
          <div className="w-full select-none rounded-xl border-[1px] border-slate-100/50 bg-slate-200 py-2 text-center leading-[1rem] text-sky-700 lg:w-[200px]">
            Control Element 1
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className={
              'h-[130px] w-[130px] select-none rounded-lg border-2 border-[rgb(180,190,200)] bg-[rgb(190,200,210)] lg:h-[150px] lg:w-[150px]' +
              (fullPageListening ? ' brightness-105' : ' cursor-pointer')
            }
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='%23999' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
            ref={controlElement2}
          />
          <div className="w-full select-none rounded-xl border-[1px] border-slate-100/50 bg-slate-200 py-2 text-center leading-[1rem] text-sky-700 lg:w-[200px]">
            Control Element 2
          </div>
        </div>
        <div className="col-start-2 col-end-2 row-start-1 row-end-1 flex flex-col items-center justify-center self-end lg:col-start-4 lg:col-end-4">
          <div className="mb-7 inline-grid grid-cols-2 content-center gap-x-10 gap-y-2 rounded-xl border-[1px] border-slate-100/50 bg-slate-200 px-6 pb-3 pt-6 text-center text-slate-500 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-4">
            {[...Array(isLarge ? 8 : 4)].map((_, i) => (
              <div key={i} className="flex flex-col">
                <input
                  aria-label={`Toggle Element ${i + 1} for Control Element 2`}
                  name={'control-2-tilt-' + (i + 1)}
                  id={'control-2-tilt-' + (i + 1)}
                  type="checkbox"
                  checked={controlGroup2[i] || false}
                  onChange={() => {
                    setControlGroup2(
                      controlGroup2.map((_, j) =>
                        j !== i ? controlGroup2[j] : !controlGroup2[i]
                      )
                    );
                  }}
                />
                <label
                  htmlFor={'control-2-tilt-' + (i + 1)}
                  className="select-none"
                >
                  {i + 1}
                </label>
              </div>
            ))}
          </div>
          <div className="flex w-full items-center justify-center rounded-xl border-[1px] border-slate-100/50 bg-slate-200 py-2 leading-[1rem] text-slate-600/90 lg:w-[200px]">
            <label htmlFor="full-page-listening" className="select-none">
              Full-Page Listening:
            </label>
            <input
              ref={fullPageListeningCheckbox}
              type="checkbox"
              name="full-page-listening"
              id="full-page-listening"
              className="ml-1"
              checked={fullPageListening}
              onChange={() => setFullPageListening((prev) => !prev)}
            />
          </div>
        </div>
      </header>
      <main className="grid flex-grow grid-cols-2 content-center gap-4 lg:grid-cols-4">
        {[...Array(isLarge ? 8 : 4)].map((_, i) => (
          <Parallax
            key={i + String(+fullPageListening)}
            borderRadius="16px"
            className={
              'w-[165px] max-w-[100%] lg:w-[200px] ' +
              (isLarge ? 'h-[250px]' : 'h-[200px]')
            }
            fullPageListening={fullPageListening}
            controlElement={[
              ...(controlGroup1[i] ? [controlElement1] : []),
              ...(controlGroup2[i] ? [controlElement2] : []),
            ]}
            controlElementOnly={controlElementOnly}
            aria-hidden="true"
          >
            <ParallaxItem
              borderRadius="16px"
              disabled={false}
              parallax={true}
              key={i}
              type={
                isLarge
                  ? (i % 2 && i < 4) || (!(i % 2) && i >= 4)
                    ? 'short2'
                    : 'short1'
                  : (i % 2 && i < 2) || (!(i % 2) && i >= 2)
                  ? 'short2'
                  : 'short1'
              }
            />
          </Parallax>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default ControlElementDemo;
