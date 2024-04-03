import { defineField, defineType, FieldDefinition } from 'sanity';

const productFields: FieldDefinition[] = [
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
];

export default productFields;
