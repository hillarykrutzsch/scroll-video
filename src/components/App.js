import React, { useRef, useEffect } from "react";
import "../styles/App.scss";
import ScrollMagic from "scrollmagic";
import { gsap } from "gsap";

const App = () => {
  const first = useRef(null);
  const second = useRef(null);
  const third = useRef(null);
  const video = useRef(null);
  const h1text = useRef(null);

  useEffect(() => {
    let controller = new ScrollMagic.Controller();
    let scene1 = new ScrollMagic.Scene({
      duration: 2000,
      triggerElement: first,
      triggerHook: 0
    })
      .addIndicators()
      .setPin(first.current)
      .addTo(controller);

    const textAnim = gsap.to(h1text.current, { opacity: 0, duration: 1 });

    let scene2 = new ScrollMagic.Scene({
      duration: 1000,
      triggerElement: first,
      triggerHook: 0
    })
      .setTween(textAnim)
      .addTo(controller);

    let accelAmount = 0.1;
    let scrollPos = 0;
    let delay = 0;

    scene1.on("update", e => {
      scrollPos = e.scrollPos / 1000;
    });

    setInterval(() => {
      delay += (scrollPos - delay) * accelAmount;
      video.current.currentTime = scrollPos;
    }, 166);
  }, [h1text]);

  return (
    <div>
      <section ref={first} class="first">
        <h1 ref={h1text}>The Big Title of the Page</h1>
        <video ref={video} src="/video/IMG_0763.mp4"></video>
      </section>
      <section ref={second} class="second">
        <h1>The Second Section</h1>
      </section>
      <section ref={third} class="third">
        <h1>The Third Section</h1>
      </section>
    </div>
  );
};

export default App;
