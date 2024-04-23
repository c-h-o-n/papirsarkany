import { type SchemaTypeDefinition } from "sanity";

import kiteSchemaTypes from "./schemas/kite/kiteSchemaTypes";
import rodSchemaTypes from "./schemas/rod/rodSchemaTypes";
import twineSchemaTypes from "./schemas/twine/twineSchemaTypes";
import reelSchemaTypes from "./schemas/reel/reelSchemaTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    ...kiteSchemaTypes,
    ...rodSchemaTypes,
    ...reelSchemaTypes,
    ...twineSchemaTypes,
  ],
};
