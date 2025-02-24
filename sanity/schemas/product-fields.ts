import { type FieldDefinition, defineField } from 'sanity';

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
  defineField({
    name: 'packageInfo',
    type: 'object',
    title: 'Csomag információk',

    fields: [
      {
        name: 'x',
        type: 'number',
        description: 'A csomag hossza cm-ben.',
        validation: (rule) => rule.required(),
      },
      {
        name: 'y',
        type: 'number',
        description: 'A csomag szélessége cm-ben.',
        validation: (rule) => rule.required(),
      },
      {
        name: 'z',
        type: 'number',
        description: 'A csomag magassága cm-ben.',
        validation: (rule) => rule.required(),
      },
      {
        name: 'weight',
        type: 'number',
        title: 'Súly',
        description: 'A csomag súlya g-ban.',

        validation: (rule) => rule.required(),
      },
    ],
    validation: (rule) => rule.required(),
  }),
] satisfies FieldDefinition[];
