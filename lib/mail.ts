import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "hardiksadhu472@gmail.com",
    pass: "pryv ceyy xmai xeoh ",
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const url = "http://localhost:3000/verify?token=" + token;

  const isEmailSent = await transporter.sendMail({
    to: email,
    from: "hardiksadhu472@gmail.com",
    subject: "Verify Email Address",
    html: `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">

        <h2>Email Verification</h2>

        <p>
            Thank you for signing up! To complete your registration, please click the button below to verify your email address.
        </p>

        <p>
            <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px;">
                Verify Email
            </a>
        </p>

        <p>
            If the button above doesn't work, you can also manually copy and paste the following URL into your browser:
            <br>
            <code>${url}</code>
        </p>

        <p>
            This verification link will expire in 24 hours.
        </p>

        <p>
            If you did not sign up for this service, you can safely ignore this email.
        </p>

    </div>
    `,
  });
  if (isEmailSent.messageId) {
    return true;
  } else {
    return false;
  }
};
