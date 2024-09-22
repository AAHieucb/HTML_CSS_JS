import { Parallax, ParallaxBanner, useParallax } from 'react-scroll-parallax';

function App() {
  const parallax = useParallax({
    onProgressChange: (progress) => {
      if (parallax.ref.current) {
        parallax.ref.current.style.setProperty(
          "--progress",
          (progress + 2).toString()
        );
      }
    },
  });
  return (
    <div style={{height: "2000px"}}>
      <div style={{height: "500px"}}>Header</div>
      <div>a</div>
      <h1
        ref={parallax.ref}
        style={{ 
          fontSize: `calc(16px *2* var(--progress))`,
          textAlign: "center"
        }}
      >
        Hello World
      </h1>
      <Parallax speed={20}>
        <div>Hieu</div>
      </Parallax>
      <div>a</div>
      <ParallaxBanner
        layers={[
          { image: 'https://react-scroll-parallax.damnthat.tv/img/banner-background.jpg', speed: -20 },
          {
            speed: -30,
            children: (
              <div style={{position: "absolute", inset: "0", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <h1 style={{color: "white", fontSize: "50px"}}>WHERE</h1>
              </div>
            ),
          },
          { image: 'https://react-scroll-parallax.damnthat.tv/img/banner-foreground.png', speed: -10 },
        ]}
        style={{
          aspectRatio: "2 / 1"
        }}
      >
        {/* <div style={{position: "absolute"}}>
          <h1 style={{color: "white"}}>Hello World!</h1>
        </div> */}
      </ParallaxBanner>
    </div>
  );
}

export default App;