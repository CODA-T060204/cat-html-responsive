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

const navPC = document.querySelector("#navbar__list--pc");
const navMobile = document.querySelector("#navbar__list--mobile");

if (navPC && navMobile) {
  navMobile.innerHTML = navPC.innerHTML;
}

const backToTopBtn = document.getElementById("backToTopBtn");

// 1. Kiểm tra vị trí cuộn để ẩn/hiện nút
window.addEventListener("scroll", () => {
  // Khi cuộn xuống quá 300px thì hiện nút, ngược lại thì ẩn
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

// 2. Click vào nút để cuộn mượt lên đầu trang
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Cuộn mượt mà thay vì giật cục
  });
});

// ======================== Các tour du lịch ===========================
document.querySelectorAll("[data-tabs]").forEach(function (block) {
  var tabs = block.querySelectorAll("[data-tab]");
  var items = block.querySelectorAll("[data-group]");

  function show(group) {
    tabs.forEach(function (t) {
      t.classList.toggle("current", t.dataset.tab === group);
    });
    items.forEach(function (i) {
      i.hidden = i.dataset.group !== group;
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      show(t.dataset.tab);
    });
  });

  // lúc tải trang: chỉ hiện nhóm của tab đang có class "current"
  var first = block.querySelector("[data-tab].current") || tabs[0];
  if (first) show(first.dataset.tab);
});
