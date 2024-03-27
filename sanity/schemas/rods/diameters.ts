import { defineArrayMember, defineType } from 'sanity';

export default defineType({
  name: 'diameters',
  type: 'array',
  title: 'Átmérők',
  validation: (rule) => rule.required(),
  of: [
    defineArrayMember({
      type: 'object',
      fields: [
        {
          name: 'diameter',
          title: 'Átmérő',
          type: 'number',
          description: 'mm-ben',
          validation: (rule) => rule.required().positive(),
        },
        {
          name: 'pricePerMeter',
          title: 'Ár',
          type: 'number',
          description: 'Az ár méterenként értendő.',
          validation: (rule) => rule.required().positive(),

        },
        {
          name: 'lengths',
          title: 'Rendelhető hossz',
          type: 'lengths',
        },
      ],
    }),
  ],
});
