import { defineField, FieldDefinition } from 'sanity';

export default [
  defineField({
    name: 'name',
    type: 'string',
    title: 'Név',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'image',
    type: 'image',
    title: 'Kép',
  }),
] satisfies FieldDefinition[];
