document.addEventListener("DOMContentLoaded", () => {
  // Safe element selection
  const navBar = document.querySelector("nav");
  const logoFirst = document.querySelector(".logo.first");
  const logoSecond = document.querySelector(".logo.second");
  const navList = document.querySelector(".nav-list ul");
  const toggleBtn = document.querySelector(".toggle");
  const closeBtn = document.querySelector(".close");
  const scrollBtn = document.getElementById("scrollBtn");
  

  // Only run if nav elements exist
  if (toggleBtn && closeBtn && navList) {
    // Open mobile menu
    toggleBtn.addEventListener("click", () => {
      navList.classList.add("open");
      closeBtn.classList.add("show");
    });

    // Close mobile menu
    closeBtn.addEventListener("click", () => {
      navList.classList.remove("open");
      closeBtn.classList.remove("show");
    });
  }

  // Navbar scroll behavior
  if (navBar && logoFirst && logoSecond) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navBar.classList.add("color");
        logoFirst.classList.add("close");
        logoSecond.classList.add("open");
      } else {
        navBar.classList.remove("color");
        logoFirst.classList.remove("close");
        logoSecond.classList.remove("open");
      }
    });
  }

  // Scroll-to-top button
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
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
document.getElementById('year').innerHTML = new Date().getFullYear();


