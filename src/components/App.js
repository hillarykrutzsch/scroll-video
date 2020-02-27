import React, { useRef, useEffect } from "react";
import "../styles/App.scss";
import * as ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { TweenMax, TimelineMax, gsap } from "gsap"; // Also works with TweenLite and TimelineLite
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

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
      triggerElement: first.current,
      triggerHook: 0
    })
      .addIndicators()
      .setPin(first.current)
      .addTo(controller);

    let textAnim = gsap.fromTo(
      h1text.current,
      1,
      { opacity: 1 },
      { opacity: 0 }
    );

    let scene2 = new ScrollMagic.Scene({
      duration: 1000,
      offset: 200,
      triggerElement: first.current,
      triggerHook: 0
    })
      .setTween(textAnim)
      .addTo(controller);

    let accelAmount = 0.5;
    let scrollPos = 0;
    let delay = 0;

    scene1.on("update", e => {
      scrollPos = e.scrollPos / 1000;
    });

    setInterval(() => {
      delay += (scrollPos - delay) * accelAmount;
      video.current.currentTime = delay;
    }, 166);
  }, []);

  return (
    <div>
      <section ref={first} className="first">
        <h1 ref={h1text}>The Big Title of the Page</h1>
        <video ref={video} src="/video/IMG_0763.mp4"></video>
      </section>
      <section ref={second} className="second">
        <h1>The Second Section</h1>
      </section>
      <section ref={third} className="third">
        <h1>The Third Section</h1>
      </section>
    </div>
  );
};

export default App;
