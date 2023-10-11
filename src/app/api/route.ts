import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'no_key');
  const vendorTemplateId = 'd-6eee94a3becb45d2b50e5f8d6a1ac491';
  const customreTemplateId = 'd-c5e1d19e77f54103978a24ff6c90344f';
  const to = 'balint.ducsai@gmail.com';

  const message: MailDataRequired = {
    to,
    from: 'mail@papirsarkany.hu',
    templateId: vendorTemplateId,
    dynamicTemplateData: body,
  };

  // sgMail
  //   .send(message)
  //   .then(() => {
  //     console.log(`Email is sent to ${to}`);
  //   })
  //   .catch((error: any) => {
  //     console.error(error);
  //   });

  return NextResponse.json(body);
}
