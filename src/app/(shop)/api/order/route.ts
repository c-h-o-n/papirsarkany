import { createOrder } from '@/lib/db';
import { sendEmail, setSendgridApiKey } from '@/lib/email';
import { currencyFormatter } from '@/lib/formatters';
import { createParcel } from '@/lib/foxpost';
import {
  getFoxpostPackageSizeCategory,
  getTotalPackageInfo,
} from '@/lib/foxpost-package-size';
import {
  isPreviewEnv,
  isProdEnv,
  normalizeOrderForm,
  validateOrderForm,
} from '@/lib/helpers';
import { OrderMail, OrderRequestBody } from '@/lib/types';
import { MailDataRequired } from '@sendgrid/mail';
import { NextResponse } from 'next/server';
import { ValidationError } from 'yup';

setSendgridApiKey();

export async function POST(request: Request) {
  const { VENDOR_EMAIL_ADDRESS } = process.env;

  try {
    if (!VENDOR_EMAIL_ADDRESS) {
      throw new Error('Missing vendor email.');
    }

    const body = (await request.json()) as OrderRequestBody;
    const { cart, formData, totalPrice, foxpostOperatorId } = body;

    // TODO move this into a middleware
    const validatedFormData = await validateOrderForm(formData);

    const normalizedFormData = normalizeOrderForm(validatedFormData);

    const order = await createOrder(normalizedFormData, cart);

    const orderEmailData: OrderMail = {
      contact: {
        email: normalizedFormData.email,
        firstName: normalizedFormData.firstName,
        lastName: normalizedFormData.lastName,
        phone: normalizedFormData.phoneNumber,
      },
      shippingOption: normalizedFormData.shippingOption,
      shipping: {
        postcode: normalizedFormData.shippingPostcode,
        city: normalizedFormData.shippingCity,
        address: normalizedFormData.shippingAddress,
        subaddress: normalizedFormData.shippingSubaddress,
      },
      paymentOption: normalizedFormData.paymentOption,
      billing: {
        postcode: normalizedFormData.billingPostcode,
        city: normalizedFormData.billingCity,
        address: normalizedFormData.billingAddress,
        subaddress: normalizedFormData.billingSubaddress,
      },
      comment: normalizedFormData.comment,
      subject: 'papirsarkany.hu - Köszönöm rendelését!',
      products: cart.map((product) => ({
        name: product.name,
        price: currencyFormatter(product.price),
        quantity: product.quantity.toString(),
      })),
      total: currencyFormatter(totalPrice),
    };

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

    if (
      normalizedFormData.shippingOption === 'Foxpost automatába' &&
      foxpostOperatorId &&
      isProdEnv()
    ) {
      const foxpostResponse = await createParcel({
        cod: totalPrice,
        destination: foxpostOperatorId,
        recipientEmail: normalizedFormData.email,
        recipientName: `${normalizedFormData.lastName} ${normalizedFormData.firstName}`,
        recipientPhone: normalizedFormData.phoneNumber,
        size: getFoxpostPackageSizeCategory(getTotalPackageInfo(cart)) || 'M',
      });

      const foxpostResponseBody = (await foxpostResponse.json()) as {
        valid: boolean;
        parsels: unknown[];
      };

      if (!foxpostResponse.ok || !foxpostResponseBody.valid) {
        console.log('body is not valid');
        throw new Error(foxpostResponse.statusText);
      }
    }

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

    switch (true) {
      case error instanceof ValidationError:
        return NextResponse.json(
          {
            error: `Validation error: ${error.params?.label || error.path} ${error.errors.join(',')}`,
          },
          { status: 403 },
        );
      default:
        return NextResponse.json(
          { error: `Internal Server Error reason: ${error}}` },
          { status: 500 },
        );
    }
  }
}
