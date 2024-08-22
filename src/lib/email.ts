import { Order } from '@prisma/client';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { CUSTOMER_TEMPLATE_ID, VENDOR_TEMPLATE_ID } from './constants';
import { OrderMail } from './types';

export function setSendgridApiKey() {
  const { SENDGRID_API_KEY } = process.env;

  if (!SENDGRID_API_KEY) {
    throw new Error('Missing sendgrid API key.');
  }

  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function sendEmail(mailData: MailDataRequired) {
  await sgMail.send(mailData);

  console.log(`Vendor email is sent to ${mailData.to}`);
}

export async function sendOrderEmails(order: Order, orderEmailData: OrderMail) {
  const { VENDOR_EMAIL_ADDRESS } = process.env;

  if (!VENDOR_EMAIL_ADDRESS) {
    throw new Error('Missing vendor email.');
  }

  const vendorMail: MailDataRequired = {
    from: 'mail.papirsarkany@gmail.com',
    to: VENDOR_EMAIL_ADDRESS,
    templateId: VENDOR_TEMPLATE_ID,
    dynamicTemplateData: {
      ...orderEmailData,
      subject: `Rendelés #${order.id}`,
    } satisfies OrderMail,
  };

  const customerMail: MailDataRequired = {
    from: 'mail.papirsarkany@gmail.com',
    to: orderEmailData.contact.email,
    replyTo: VENDOR_EMAIL_ADDRESS,
    templateId: CUSTOMER_TEMPLATE_ID,
    dynamicTemplateData: orderEmailData,
  };

  await sendEmail(vendorMail);
  await sendEmail(customerMail);
}
