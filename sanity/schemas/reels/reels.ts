import { defineType } from 'sanity';
import productFields from '../../productFields';

export default defineType({
  name: 'reels',
  type: 'document',
  title: 'Zsinórtartók',
  fields: [
    ...productFields,
  ]
})