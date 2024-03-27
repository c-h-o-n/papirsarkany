import { defineArrayMember, defineType } from 'sanity';

export default defineType({
  name: 'lengths',
  type: 'array',
  validation: (rule) => rule.required(),
  of: [
    defineArrayMember({
      name: 'value',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
  ],
});