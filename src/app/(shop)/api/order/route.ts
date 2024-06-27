import { createOrder } from '@/lib/db';
import { sendEmail, setSendgridApiKey } from '@/lib/email';
import { isPreviewEnv, isProdEnv, normalizeFormData } from '@/lib/helpers';
import { CartItem, FormSchemaObject, OrderMail } from '@/lib/types';
import { MailDataRequired } from '@sendgrid/mail';
import { NextResponse } from 'next/server';

setSendgridApiKey();
// TODO check if shipping personal pickup
export async function POST(request: Request) {
  const { VENDOR_EMAIL_ADDRESS } = process.env;

  try {
    if (!VENDOR_EMAIL_ADDRESS) {
      throw new Error('Missing vendor email.');
    }

    const body = (await request.json()) as {
      data: FormSchemaObject;
      cart: CartItem[];
      orderEmailData: OrderMail;
    };
    const { cart, data, orderEmailData } = body;

    const normalizedData = normalizeFormData(data);

    const order = await createOrder(normalizedData, cart);

    const vendorTemplateId = 'd-6eee94a3becb45d2b50e5f8d6a1ac491';
    const customerTemplateId = 'd-c5e1d19e77f54103978a24ff6c90344f';

    const vendorMail: MailDataRequired = {
      from: 'mail.papirsarkany@gmail.com',
      to: VENDOR_EMAIL_ADDRESS,
      templateId: vendorTemplateId,
      dynamicTemplateData: {
        ...orderEmailData,
        subject: `Rendelés #${order.id}`,
      } as OrderMail,
    };

    const customerMail: MailDataRequired = {
      from: 'mail.papirsarkany@gmail.com',
      to: orderEmailData.contact.email,
      replyTo: VENDOR_EMAIL_ADDRESS,
      templateId: customerTemplateId,
      dynamicTemplateData: orderEmailData,
    };

    if (isProdEnv() || isPreviewEnv()) {
      await sendEmail(vendorMail);
      await sendEmail(customerMail);
    }

    return NextResponse.json(body);
  } catch (error) {
    console.error(error);

    if (isProdEnv()) {
      await sendEmail({
        from: 'mail@papirsarkany.hu',
        to: 'balint.ducsai@gmail.com',
        subject: 'error detected in papirsarkany.hu/api/order',
        text: `Error caught in url papirsarkany/api/order. \nreason: ${error}`,
      });
    }

    return NextResponse.json(
      { error: `Internal Server Error reason: ${error}}` },
      { status: 500 },
    );
  }
}
