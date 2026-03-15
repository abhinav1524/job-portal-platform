import nodemailer from "nodemailer";

const sendEmail = async (options) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",  // ← changed
    port: 587,               // ← changed
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;