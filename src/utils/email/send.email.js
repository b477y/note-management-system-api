import nodemailer from "nodemailer";

const sendEmail = async ({
  to = [],
  cc = [],
  bcc = [],
  subject = "",
  text = "",
  html = "",
  attachments = [],
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"Support Team" <${process.env.MAILER_USER}>`,
    to,
    cc,
    bcc,
    subject,
    text,
    html,
    attachments,
  });

  return info;
};

export default sendEmail;
