import React, { useRef, useEffect } from "react";
import "../styles/App.scss";
import * as ScrollMagic from "scrollmagic"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { TweenMax, TimelineMax, gsap, Power1 } from "gsap"; // Also works with TweenLite and TimelineLite
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
//import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

const App = () => {
  const scrollVid = useRef(null);
  const parallax = useRef(null);
  const video = useRef(null);
  const h1text = useRef(null);
  const background = useRef(null);

  useEffect(() => {
    let controller = new ScrollMagic.Controller();

    let accelAmount = 0.5;
    let scrollPos = 0;
    let delay = 0;

    //SCENE 1 Video
    let scene1 = new ScrollMagic.Scene({
      duration: 2000,
      triggerElement: scrollVid.current,
      triggerHook: 0
    })
      // .addIndicators()
      .setPin(scrollVid.current)
      .addTo(controller);

    scene1.on("update", e => {
      scrollPos = e.scrollPos / 1000;
    });
    setInterval(() => {
      delay += (scrollPos - delay) * accelAmount;
      video.current.currentTime = delay;
    }, 166);

    //SCENE 2 TEXT ANIMATION
    let scene2 = new ScrollMagic.Scene({
      duration: 1000,
      offset: 200,
      triggerElement: scrollVid.current,
      triggerHook: 0
    })
      .setTween(gsap.fromTo(h1text.current, 1, { opacity: 1 }, { opacity: 0 }))
      .addTo(controller);

    //SCENE 3 PARALLAX
    var scene3 = new ScrollMagic.Scene({
      triggerElement: parallax.current,
      triggerHook: 1,
      duration: "100%"
    })
      .setTween(
        gsap.from(background.current, 1, {
          y: "-20%",
          autoAlpha: 0.3,
          ease: Power1.easeInOut
        })
      )
      .addTo(controller);
  }, []);

  return (
    <div>
      <section ref={scrollVid} className="scroll-vid">
        <h1 ref={h1text}>Here is a scrolling video</h1>
        <video ref={video} src="/media/IMG_0763.mp4"></video>
      </section>
      <section className="gradient">
        <h1>A beautiful gradient</h1>
      </section>
      <section ref={parallax} className="parallax">
        <div ref={background} className="background"></div>
        <h1>The Second Section</h1>
      </section>
      <section className="gradient">
        <h1>Another beautiful gradient</h1>
      </section>
    </div>
  );
};

export default App;
