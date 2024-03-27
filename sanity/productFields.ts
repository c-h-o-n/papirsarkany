import { defineField, FieldDefinition } from 'sanity';

const productFields: FieldDefinition[] = [
  defineField({
    name: 'name',
    type: 'string',
    title: 'Név',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'slug',
    type: 'slug',
    title: 'Útvonal (slug)',
    description: 'A termék ezen az útvonalon lesz elérhető.',
    options: {
      source: 'name',
    },
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'image',
    type: 'image',
    title: 'Kép',
  }),
];

export default productFields;
