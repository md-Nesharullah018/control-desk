import nodemailer from "nodemailer";

export const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP for Password Change - AuthPro",
    text: `Your OTP for changing the password is: ${otp}. This is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions); 
};