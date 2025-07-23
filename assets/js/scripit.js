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


const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { email } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourgmail@gmail.com", // Replace with your email
      pass: "yourapppassword",     // Use an App Password (not your Gmail password)
    },
  });

  let mailOptions = {
    from: "yourgmail@gmail.com",
    to: "chandhuarun120@gmail.com",
    subject: "New Subscription",
    text: `New subscriber: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Email sent!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

