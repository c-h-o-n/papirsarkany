import { z } from 'zod';

import { WithImageAsset } from './types';

export const cartItemValidationSchema = z.object({
  _id: z.string().min(1, 'Hiányzó termék azonosító.'),
  name: z.string().min(1, 'Hiányzó név'),
  price: z.number().positive('Érvénytelen ár'),
  packageInfo: z.object({
    x: z.number().positive('Hiányzó vagy érvénytelen csomag információk'),
    y: z.number().positive('Hiányzó vagy érvénytelen csomag információk'),
    z: z.number().positive('Hiányzó vagy érvénytelen csomag információk'),
    weight: z.number().positive('Hiányzó vagy érvénytelen csomag információk'),
  }),
  quantity: z.number().positive('Érvénytelen mennyiség'),
});

export type CartItem = WithImageAsset<z.infer<typeof cartItemValidationSchema>>;
