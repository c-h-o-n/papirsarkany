import { defineField, defineType } from 'sanity';
import productFields from '../productFields';

export default defineType({
  name: 'twine',
  type: 'document',
  title: 'Zsinórok',
  fields: [
    ...productFields,
    defineField({
      name: 'diameters',
      type: 'twineDiameters',
      title: 'Átmérők',
    }),
  ],
});
