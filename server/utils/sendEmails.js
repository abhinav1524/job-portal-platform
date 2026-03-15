import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  await resend.emails.send({
    from: "onboarding@resend.dev", // use this until you add your own domain
    to: options.email,
    subject: options.subject,
    text: options.message,
  });
};

export default sendEmail;