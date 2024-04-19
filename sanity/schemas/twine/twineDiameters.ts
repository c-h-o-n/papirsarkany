import { defineArrayMember, defineType } from 'sanity';

export default defineType({
  name: 'twineDiameters',
  type: 'array',
  validation: (rule) => rule.required().unique(),
  of: [
    defineArrayMember({
      type: 'object',
      fields: [
        {
          name: 'diameter',
          type: 'number',
          title: 'Átmérő',
          description: 'Rendelhető átmérő mm-ben.n',
          validation: (rule) => rule.required().positive(),
        },
        {
          name: 'pricePerMeter',
          type: 'number',
          title: 'Ár',
          description: 'Az ár méterenként értendő.',
          validation: (rule) => rule.required().positive(),
        },
        {
          name: 'tensileStrength',
          type: 'number',
          title: 'Szakítószilárdság',
          description: 'kg-ban',
          validation: (rule) => rule.required().positive(),
        }
      ]
    })
  ]
})