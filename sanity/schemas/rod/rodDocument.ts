import { defineField, defineType } from 'sanity';
import productFields from '../productFields';

export default defineType({
  name: 'rod',
  type: 'document',
  title: 'Pálcák, rudak és csövek',
  fields: [
    ...productFields,
    defineField({
      name: 'diameters',
      type: 'rodDiameters',
      title: 'Átmérők',
    })
  ],
});

