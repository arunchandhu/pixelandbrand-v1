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

