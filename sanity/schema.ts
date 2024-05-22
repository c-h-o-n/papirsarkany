import { type SchemaTypeDefinition } from 'sanity';

import kiteSchemaTypes from './schemas/kite/kiteSchemaTypes';
import reelSchemaTypes from './schemas/reel/reelSchemaTypes';
import rodSchemaTypes from './schemas/rod/rodSchemaTypes';
import twineSchemaTypes from './schemas/twine/twineSchemaTypes';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    ...kiteSchemaTypes,
    ...rodSchemaTypes,
    ...reelSchemaTypes,
    ...twineSchemaTypes,
  ],
};
