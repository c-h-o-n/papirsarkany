import { defineType } from 'sanity';
import productFields from '../../productFields';

export default defineType({
  name: 'reel',
  type: 'document',
  title: 'Zsinórtartók',
  fields: [
    ...productFields,
  ]
})