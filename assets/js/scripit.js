document.addEventListener("DOMContentLoaded", () => {
  // Safe element selection
  const navBar = document.querySelector("nav");
  const navList = document.querySelector(".nav-list ul");
  const toggleBtn = document.querySelector(".toggle");
  const closeBtn = document.querySelector(".close");
  const scrollBtn = document.getElementById("scrollBtn");
  const dropDownList = document.querySelector(".drop-down-list");
  const mobileMenu = document.querySelector(".mobile-menu");

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });


  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navBar.classList.add("color");
    } else {
      navBar.classList.remove("color");
    }
  });

  // Scroll-to-top button
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight ? scrollTop / docHeight : 0;

      // Show/hide scroll button
      if (scrollTop > 100) {
        scrollBtn.classList.add("show");
      } else {
        scrollBtn.classList.remove("show");
      }

      // Update scroll fill height
      scrollBtn.style.setProperty("--fill-height", `${scrollPercent * 100}%`);
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// Year
document.getElementById("year").innerHTML = new Date().getFullYear();

// ===========================
// Email Service
// ===========================

// POST helper
async function postData(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Contact Form Submit
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    grecaptcha.ready(function () {
      grecaptcha
        .execute("YOUR_SITE_KEY", { action: "submit" })
        .then(async function (token) {
          const data = {
            name: document.getElementById("contactName").value,
            email: document.getElementById("contactEmail").value,
            phone: document.getElementById("contactPhone").value,
            service: document.getElementById("contactService").value,
            website: document.querySelector(
              "#contactForm input[name='website']"
            ).value,
            recaptchaToken: token,
          };
          const result = await postData("http://localhost:3000/contact", data);
          if (result.redirect) window.location.href = result.redirect;
        });
    });
  });
}

// Subscribe Form Submit
const subscribeForm = document.getElementById("subscribeForm");
if (subscribeForm) {
  subscribeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    grecaptcha.ready(function () {
      grecaptcha
        .execute("YOUR_SITE_KEY", { action: "submit" })
        .then(async function (token) {
          const data = {
            email: document.getElementById("subscribeEmail").value,
            website: document.querySelector(
              "#subscribeForm input[name='website']"
            ).value,
            recaptchaToken: token,
          };
          const result = await postData(
            "http://localhost:3000/subscribe",
            data
          );
          if (result.redirect) window.location.href = result.redirect;
        });
    });
  });
}
