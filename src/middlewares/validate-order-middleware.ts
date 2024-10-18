import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { formatZodErrors } from '~/lib/formatters';
import { OrderRequestBody } from '~/lib/types';
import { mergedFormSchemaObject } from '~/lib/validation-schemas';

// This function can be marked `async` if using `await` inside
export async function validateOrderMiddleware(request: NextRequest) {
  console.log('hit middleware');
  try {
    const body = (await request.json()) as OrderRequestBody;
    const { formData } = body;
    await mergedFormSchemaObject.parseAsync(formData);

    console.log('valid');
    return NextResponse.next();
  } catch (error) {
    console.log('invalid');
    return NextResponse.json(
      {
        error: `Validation error: ${formatZodErrors(error as ZodError)}`,
      },
      { status: 403 },
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/order',
};
