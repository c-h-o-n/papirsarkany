import { createOrder } from "@/lib/db";
import { sendEmail, setSendgridApiKey } from "@/lib/email";
import { isProdEnv } from '@/lib/helpers';
import { CartItem, FormSchemaObject, OrderMail } from "@/lib/types";
import { MailDataRequired } from "@sendgrid/mail";
import { NextResponse } from "next/server";

setSendgridApiKey();

export async function POST(request: Request) {
  const { VENDOR_EMAIL_ADDRESS } = process.env;

  try {
    if (!VENDOR_EMAIL_ADDRESS) {
      throw new Error("Missing vendor email.");
    }

    const body = (await request.json()) as {
      data: FormSchemaObject;
      cart: CartItem[];
      orderEmailData: OrderMail;
    };

    const order = await createOrder(body.data, body.cart);

    const vendorTemplateId = "d-6eee94a3becb45d2b50e5f8d6a1ac491";
    const customerTemplateId = "d-c5e1d19e77f54103978a24ff6c90344f";

    const vendorMail: MailDataRequired = {
      from: "mail.papirsarkany@gmail.com",
      to: VENDOR_EMAIL_ADDRESS,
      templateId: vendorTemplateId,
      dynamicTemplateData: {
        ...body.orderEmailData,
        subject: `Rendelés #${order.id}`,
      } as OrderMail,
    };

    const customerMail: MailDataRequired = {
      from: "mail.papirsarkany@gmail.com",
      to: body.orderEmailData.contact.email,
      replyTo: VENDOR_EMAIL_ADDRESS,
      templateId: customerTemplateId,
      dynamicTemplateData: body.orderEmailData,
    };

    await sendEmail(vendorMail);
    await sendEmail(customerMail);

    return NextResponse.json(body);
  } catch (error) {
    console.error(error);
    
    if(isProdEnv()) {
      await sendEmail({
        from: "mail@papirsarkany.hu",
        to: "balint.ducsai@gmail.com",
        subject: 'error in papirsarkany.hu/api',
        text: `Error caught in url papirsarkany/api. \nreason: ${error}`,
      });
    }

    return NextResponse.json(
      { error: `Internal Server Error reason: ${error}}` },
      { status: 500 },
    );
  }
}
