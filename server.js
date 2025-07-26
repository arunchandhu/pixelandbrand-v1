const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chandhuarun120@gmail.com",           // Your Gmail address
    pass: "qmilpoispccvghac",             // Your Gmail App Password
  },
});

// Helper: Honeypot check
function isSpam(reqBody) {
  return reqBody.website && reqBody.website.trim() !== "";
}

// Helper: Verify reCAPTCHA
async function verifyRecaptcha(token) {
  const secret = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";
  const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`);
  return response.data.success;
}

// Handle contact form
app.post("/contact", async (req, res) => {
  const { name, email, phone, service, website, recaptchaToken } = req.body;

  if (isSpam(req.body)) return res.status(400).send("Spam detected.");
  if (!(await verifyRecaptcha(recaptchaToken))) return res.status(400).send("reCAPTCHA failed.");

  const mailOptions = {
    from: email,
    to: "chandhuarun120@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ redirect: "/thanks.html" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

// Handle subscribe form
app.post("/subscribe", async (req, res) => {
  const { email, website, recaptchaToken } = req.body;

  if (isSpam(req.body)) return res.status(400).send("Spam detected.");
  if (!(await verifyRecaptcha(recaptchaToken))) return res.status(400).send("reCAPTCHA failed.");

  const mailOptions = {
    from: email,
    to: "chandhuarun120@gmail.com",
    subject: "New Subscription",
    text: `New subscriber: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ redirect: "/thanks.html" });
  } catch (error) {
    console.error("Error sending subscription:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
