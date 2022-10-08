const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active"); // this is how you activate the class using js ps: active is not hardcoded in html
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// carousel

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);

const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + "px";
});
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`; //move the width of the left of the target style
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};
nextButton.addEventListener("click", () => {
  console.log("next clicked");
  const currentSlide = track.querySelector(".current-slide");

  const nextSlide = currentSlide.nextElementSibling;
  moveToSlide(track, currentSlide, nextSlide);
  const currentDot = dotsNav.querySelector(".current-slide"); // cz the current-slide will be updated on the dots also
  const nextDot = currentDot.nextElementSibling;
  updateDots(currentDot, nextDot); // the next dot will take the current dot cz we are moving next here
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});
prevButton.addEventListener("click", () => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  moveToSlide(track, currentSlide, prevSlide);
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  updateDots(currentDot, prevDot);
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

// the dots i gave them one listener
dotsNav.addEventListener("click", (e) => {
  // what we clicked on
  const targetDot = e.target.closest("button");
  if (!targetDot) return; // if when i click its not on a button just stop  and get out
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide"); // cz dots also have current slide class
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  // this ubove means findIndex is like a loop im seach for each dot search and return only the index of the dot that is equal to targetDot
  const targetSlide = slides[targetIndex];
  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});

// second carousel

const track2 = document.querySelector(".carousel__track2");
const slides2 = Array.from(track2.children);
const nextButton2 = document.querySelector(".carousel2-rightBtn");
const prevButton2 = document.querySelector(".carousel2-leftBtn");
const slide2Width = slides2[0].getBoundingClientRect().width;
slides2.forEach((slide, index) => {
  let width = slide2Width * index;
  slide.style.left = width + "px";
  console.log(slide2Width);

  // slide.style.paddingright = 2 + "px";
});
nextButton2.addEventListener("click", () => {
  const currentSlide = track2.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  moveToSlide(track2, currentSlide, nextSlide);
  const nextIndex = slides2.findIndex((slide) => slide === nextSlide);
  hideShowArrows(slides2, prevButton2, nextButton2, nextIndex);
});
prevButton2.addEventListener("click", () => {
  const currentSlide = track2.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  moveToSlide(track2, currentSlide, prevSlide);
  const prevIndex = slides2.findIndex((slide) => slide === prevSlide);
  hideShowArrows(slides2, prevButton2, nextButton2, prevIndex);
});
