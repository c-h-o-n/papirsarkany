import { defineField, defineType } from 'sanity';
import productFields from '../../productFields';

export default defineType({
  name: 'twines',
  type: 'document',
  title: 'Zsinórok',
  fields: [
    ...productFields,
    defineField({
      name: 'diameters',
      type: 'twineDiameters',
      title: 'Átmérők'
    })
  ],
});



const temp = {
  "diameters":
  [
    {"name": "1mm", 
    "pricePerMeter": 40
  }],
    "tensileStegth": "30kg"
}