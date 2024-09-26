import { defineField, defineType } from 'sanity';

import productFields from '../product-fields';

export default defineType({
  name: 'reel',
  type: 'document',
  title: 'Zsinórtartók',
  fields: [
    ...productFields,
    defineField({
      name: 'price',
      type: 'number',
      title: 'Ár',
      validation: (rule) => rule.required().positive(),
    }),
  ],
});
