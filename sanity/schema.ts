import type { SchemaTypeDefinition } from "sanity";

import kiteSchemaTypes from "./schemas/kite/kite-schema-types";
import reelSchemaTypes from "./schemas/reel/reel-schema-types";
import rodSchemaTypes from "./schemas/rod/rod-schema-types";
import twineSchemaTypes from "./schemas/twine/twine-schema-types";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    ...kiteSchemaTypes,
    ...rodSchemaTypes,
    ...reelSchemaTypes,
    ...twineSchemaTypes,
  ],
};
