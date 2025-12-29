/*HERO SLIDER*/
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevHero");
const nextBtn = document.getElementById("nextHero");

let heroIndex = 0;
let heroInterval;

/* Show Slide */
function showHeroSlide(newIndex, direction = "next") {
  heroSlides.forEach(slide => {
    slide.classList.remove("active", "exit-left");
  });

  heroDots.forEach(dot => dot.classList.remove("active"));

  if (direction === "next") {
    heroSlides[heroIndex].classList.add("exit-left");
  }

  heroIndex = (newIndex + heroSlides.length) % heroSlides.length;
  heroSlides[heroIndex].classList.add("active");
  heroDots[heroIndex].classList.add("active");
}


/* Auto Slide */
function startHeroAutoSlide() {
  heroInterval = setInterval(() => {
    showHeroSlide(heroIndex + 1, "next");
  }, 6000);
}

/* Reset Auto Slide on Manual Action */
function resetHeroAutoSlide() {
  clearInterval(heroInterval);
  startHeroAutoSlide();
}

/* Controls */
nextBtn.addEventListener("click", () => {
  showHeroSlide(heroIndex + 1, "next");
  resetHeroAutoSlide();
});

prevBtn.addEventListener("click", () => {
  showHeroSlide(heroIndex - 1, "prev");
  resetHeroAutoSlide();
});

heroDots.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.dataset.slide);
    showHeroSlide(index);
    resetHeroAutoSlide();
  });
});


/* Start */
startHeroAutoSlide();



/* LOAD LATEST 3 NEWS FROM JSON */
fetch("news.json")
  .then(res => res.json())
  .then(data => {
    data.sort((a,b) => new Date(b.date) - new Date(a.date));
    const latestThree = data.slice(0,3);

    const container = document.getElementById("latestNews");

    latestThree.forEach((news, index) => {
      const div = document.createElement("div");
      div.className = "news-card";

      div.innerHTML = `
        <img src="${news.image}" alt="${news.title}">
        <h4>${news.title}</h4>
        <p>${news.excerpt}</p>
        <a href="news.html">Read full story</a>
      `;

      container.appendChild(div);
    });
  });

// Scroll-triggered fade-in for Commitment section
document.addEventListener("DOMContentLoaded", function() {
  const commitmentSection = document.querySelector(".commitment");

  function revealOnScroll() {
    const top = commitmentSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if(top < windowHeight - 100) { // trigger a bit before fully visible
      commitmentSection.classList.add("visible");
      window.removeEventListener("scroll", revealOnScroll); // optional: remove listener after reveal
    }
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // check in case section is already visible on load
});


// When creating cards for homepage:
div.className = 'home-news-card'; // instead of 'news-card'




  
  /*MOBILE SWIPE FUNCTIONALITY*/
  let startX = 0;

const heroSlider = document.querySelector(".hero-slider");

heroSlider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

heroSlider.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      showHeroSlide(heroIndex + 1, "next");
    } else {
      showHeroSlide(heroIndex - 1, "prev");
    }
    resetHeroAutoSlide();
  }
});
