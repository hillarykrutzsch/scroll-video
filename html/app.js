const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");

const video = first.querySelector("video");
const text = first.querySelector("h1");
const end = second.querySelector("h1");

//ScrollMagic
const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
  duration: 2000,
  triggerElement: first,
  triggerHook: 0
})
  .addIndicators()
  .setPin(first)
  .addTo(controller);

let accelAmount = 0.1;
let scrollPos = 0;
let delay = 0;

scene.on("update", e => {
  scrollPos = e.scrollPos / 1000;
});

setInterval(() => {
  delay += (scrollPos - delay) * accelAmount;
  video.currentTime = delay;
}, 166);
