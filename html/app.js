const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");

const video = first.querySelector("video");
const text = first.querySelector("h1");
const end = second.querySelector("h1");

//ScrollMagic
const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
  duration: 1000,
  triggerElement: first,
  triggerHook: 0
})
  .addIndicators()
  .addTo(controller);
