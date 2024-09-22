const Footer = () => {
  return (
    <footer className="relative mt-[5px] text-center text-xs text-slate-500 before:absolute before:-top-[5px] before:left-1/2 before:w-[400px] before:max-w-full before:border-t-[1px] before:border-slate-500/30 before:-translate-x-1/2 [&_a]:font-bold [&_a]:transition-all [&_a]:duration-300 hover:[&_a]:text-slate-700">
      Images by{' '}
      <a href="https://www.vecteezy.com/members/klyaksun" target="_blank">
        Yuliya Pauliukevich
      </a>{' '}
      on{' '}
      <a href="https://www.vecteezy.com/" target="_blank">
        vecteezy.com
      </a>
    </footer>
  );
};

export default Footer;
