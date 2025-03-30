import { defineArrayMember, defineType } from "sanity";

export default defineType({
  name: "lengths",
  type: "array",
  description: "Rendelhető hossz cm-ben.",
  validation: (rule) => rule.required().unique(),
  of: [
    defineArrayMember({
      name: "value",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
  ],
});
