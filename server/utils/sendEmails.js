import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    /*to: options.email,*/
    to:"abhinavsaini1242@gmail.com",
    subject: options.subject,
    text: options.message,
  });

  if (error) {
    console.error("Resend error:", error); // ← will show in Render logs
    throw new Error(error.message);
  }

  console.log("Email sent successfully:", data); // ← confirm it worked
};

export default sendEmail;