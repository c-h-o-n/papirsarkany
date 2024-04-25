import sgMail, { MailDataRequired } from "@sendgrid/mail";

export function setSendgridApiKey() {
  const { SENDGRID_API_KEY } = process.env;
  if (!SENDGRID_API_KEY) {
    throw new Error("Missing sendgrid API key.");
  }
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function sendEmail(mailData: MailDataRequired) {
  await sgMail.send(mailData);

  console.log(`Vendor email is sent to ${mailData.to}`);
}
