import { PropsWithChildren } from 'react';

const AttributeSubTitle = ({ children }: PropsWithChildren) => {
  return (
    <p className="mt-4 text-[clamp(1rem,_1rem_+_1vw,_1.5rem)] font-bold leading-[1.5] text-slate-700/70 md:w-[600px] lg:w-[800px]">
      {children}
    </p>
  );
};

export default AttributeSubTitle;
