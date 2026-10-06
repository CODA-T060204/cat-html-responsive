const list = document.querySelector(".list-slider");
const slides = document.querySelectorAll(".slider__item");
const prevBtn = document.querySelector(".slider__btn--prev");
const nextBtn = document.querySelector(".slider__btn--next");

let currentIndex = 0;
const totalSlides = slides.length;
let autoSlideInterval;

function updateSlider(index) {
  if (index < 0) {
    currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentIndex = 0;
    list.style.transition = "none";
  } else {
    currentIndex = index;
    list.style.transition = "transform 0.5s ease-in-out";
  }

  list.style.transform = `translateX(-${currentIndex * 100}%)`;

  if (currentIndex === 0 || currentIndex === totalSlides - 1) {
    setTimeout(() => {
      list.style.transition = "transform 0.5s ease-in-out";
    }, 50);
  }
}

nextBtn.addEventListener("click", () => {
  updateSlider(currentIndex + 1);
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  updateSlider(currentIndex - 1);
  resetAutoSlide();
});

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    updateSlider(currentIndex + 1);
  }, 3500);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

startAutoSlide();
