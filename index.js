const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(cors());
app.use(express.json());

// Rate limiting to prevent spam: max 5 requests per 10 minutes per IP
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Nodemailer setup — use your Gmail & App Password here
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chandhuarun120@gmail.com",
    pass: "yourapppassword",
  },
});

// Spam check helper: returns true if honeypot field is filled (bot)
function isSpam(body) {
  return body.website && body.website.trim() !== "";
}

// Endpoint for subscription form (only email)
app.post("/subscribe", async (req, res) => {
  const { email, website } = req.body;

  if (isSpam(req.body)) {
    return res.status(400).send("Spam detected.");
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).send("Invalid email.");
  }

  const mailOptions = {
    from: "yourgmail@gmail.com",
    to: "chandhuarun120@gmail.com",
    subject: "New Subscription",
    text: `New subscriber: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Subscription email sent!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send subscription email.");
  }
});

// Endpoint for contact form (name, email, phone, service)
app.post("/contact", async (req, res) => {
  const { name, email, phone, service, website } = req.body;

  if (isSpam(req.body)) {
    return res.status(400).send("Spam detected.");
  }

  if (
    !name ||
    !email ||
    !phone ||
    !service ||
    !/\S+@\S+\.\S+/.test(email) ||
    !/^\d{10}$/.test(phone)
  ) {
    return res.status(400).send("Please fill out all fields correctly.");
  }

  const mailOptions = {
    from: "yourgmail@gmail.com",
    to: "chandhuarun120@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Contact form email sent!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send contact form email.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
