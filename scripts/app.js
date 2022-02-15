const btnMobileMenu = document.querySelector(".hero-nav__btn--mobile");
const sectionHero = document.querySelector(".hero");
const navParent = document.querySelector(".hero-nav");
const allLinks = document.querySelectorAll("a:link");
const mobBtnIcon = document.querySelector(".mobile-open");
const galleryBtn = document.querySelector(".btn-gallery");
const blogButton = document.querySelector(".btn-blog");
const inputs = document.querySelectorAll(".selection");
const subForm = document.getElementById("subscribe-form");
const dataArr = [];

// automated footer year update
const autoYear = () => {
  const footerYear = document.querySelector(".copyright");
  const currentYear = new Date().getFullYear();
  footerYear.textContent = currentYear;
};

window.onload = autoYear;

// Data fetch from API
const dataRequest = (data) => {
  for (let i = 0; i < 3; i++) {
    dataArr.push(data[i]);
  }
};

// Sticky navigation implementation
const obs = new IntersectionObserver(
  (entries) => {
    const navFixed = document.querySelector(".hero-container");
    const ent = entries[0];
    if (ent.isIntersecting === false) navFixed.classList.add("sticky");
    if (ent.isIntersecting === true) navFixed.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHero);

// Mobile burger menu controller
btnMobileMenu.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("hero-nav__btn--mobile") ||
    e.target.classList.contains("mobile-open")
  ) {
    navParent.classList.toggle("nav-open");
    mobBtnIcon.classList.toggle("btn-close");
  }
});

// Smooth scrolling for internal links
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const sectionElement = document.querySelector(href);
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }

    if (link.classList.contains("main-nav-link")) {
      navParent.classList.toggle("nav-open");
      mobBtnIcon.classList.toggle("btn-close");
    }
  });
});

// Add more gallery images controller
galleryBtn.addEventListener("click", (e) => {
  const img = "http://placeimg.com/640/360/any";
  const galleryBtn = document.getElementById("gallery-loader");
  const html = `<div class="gallery-wrapper__grid gallery-load">
              <figure class="gallery-wrapper__grid--item-01">
                <img
                  src=${img}
                  alt="image placeholder"
                />
              </figure>
              <figure class="gallery-item gallery-wrapper__grid--item-02">
                <img
                  src=${img}
                  alt="img placeholder"
                />
              </figure>
              <figure class="gallery-item gallery-wrapper__grid--item-03">
                <img
                  src=${img}
                  alt="img placeholder"
                />
              </figure>
              <figure class="gallery-wrapper__grid--item-04">
                <img src=${img} alt="img placeholder" />
              </figure>
              <figure class="gallery-wrapper__grid--item-05">
                <img src=${img} alt="img placeholder" />
              </figure>
            </div>`;
  if (e.target.nodeName === "BUTTON") {
    galleryBtn.remove();
    const galleryParent = document.querySelector(".gallery-wrapper");
    galleryParent.innerHTML += html;
  }
});

// Add more blog pages controller
blogButton.addEventListener("click", (e) => {
  const [blogData01, blogData02, blogData03] = [...dataArr];
  const html = `<ul class="blog-list gallery-load">
                <li class="blog-list__page blog-item--01">
                  <div class="blog-list__background"></div>
                  <figure class="blog-list__img">
                    <img
                      src=${blogData01.url}
                      alt="Image placeholder"
                    />
                  </figure>
                  <div class="blog-list__info">
                    <span class="blog-list__info--date">20 Nov</span>
                    <span class="blog-list__info--title"
                      >${blogData01.title}</span>
                    <span class="blog-list__info--author">By Liam - 2 hours ago</span>
                  </div>
                </li>
                <li class="blog-list__page blog-item--02">
                  <div class="blog-list__background"></div>
                  <figure class="blog-list__img">
                    <img
                      src=${blogData02.url}
                      alt="Image placeholder"
                    />
                  </figure>
                  <div class="blog-list__info">
                    <span class="blog-list__info--date">14 Nov</span>
                    <span class="blog-list__info--title"
                      >${blogData02.title}</span
                    >
                    <span class="blog-list__info--author"
                      >By Liam - 3 hours ago</span
                    >
                  </div>
                </li>
                <li class="blog-list__page blog-item--03">
                  <div class="blog-list__background"></div>
                  <figure class="blog-list__img">
                    <img
                      src=${blogData03.url}
                      alt="Image placeholder"
                    />
                  </figure>
                  <div class="blog-list__info">
                    <span class="blog-list__info--date">10 Nov</span>
                    <span class="blog-list__info--title"
                      >${blogData03.title}</span
                    >
                    <span class="blog-list__info--author"
                      >By Liam - 2 hours ago</span
                    >
                  </div>
                </li>
              </ul>`;
  if (e.target.nodeName === "BUTTON") {
    blogButton.remove();
    const blogParent = document.querySelector(".blog-wrapper__blocks");
    blogParent.innerHTML += html;
  }
});

// Focus event in input fields
inputs.forEach(function (el) {
  const fieldInput = "font-size: 1.1rem; top: 18%; left: 2%;";
  const fieldText = "font-size: 1.1rem; top: 4%; left: 2%;";
  const errorMsg = document.querySelector(".sub-feedback");
  el.addEventListener(
    "focus",
    function (e) {
      if (e.target.nodeName === "INPUT") {
        e.target.offsetParent.childNodes[3].setAttribute("style", fieldInput);
      } else {
        e.target.offsetParent.childNodes[3].setAttribute("style", fieldText);
      }
      errorMsg.textContent = "";
    },
    true
  );
  el.addEventListener(
    "blur",
    function (e) {
      if (e.target.value === "")
        e.target.offsetParent.childNodes[3].setAttribute("style", "");
    },
    true
  );
});

// Subscribe form validation
subForm.addEventListener("submit", (e) => {
  const subInput = document.getElementById("subscribe-email");
  const errorMsg = document.querySelector(".sub-feedback");
  e.preventDefault();

  const inputVal = subInput.value;
  if (!inputVal.includes("@") || inputVal.length === 0) {
    errorMsg.textContent = "Please enter a valid email address";
  }
});
