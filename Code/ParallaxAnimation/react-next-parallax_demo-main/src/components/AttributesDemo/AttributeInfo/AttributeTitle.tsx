import { PropsWithChildren } from 'react';

const AttributeTitle = ({ children }: PropsWithChildren) => {
  return (
    <h3
      id={children?.toString().toLowerCase()}
      className="text-[clamp(2rem,_2rem_+_1vw,_3rem)] font-bold text-red-500/70 md:w-[600px] lg:w-[800px]"
    >
      {children}
    </h3>
  );
};

export default AttributeTitle;
