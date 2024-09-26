import { defineArrayMember, defineType } from 'sanity';

export default defineType({
  name: 'kiteMaterials',
  type: 'array',
  title: 'Anyagok',
  of: [
    defineArrayMember({
      type: 'string',
      options: {
        list: [
          'ripstop',
          'üvegszálas műanyag',
          'fa',
          'nylon',
          'bambusz',
          'papír',
        ],
      },
    }),
  ],
});
