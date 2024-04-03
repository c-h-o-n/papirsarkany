import { type SchemaTypeDefinition } from 'sanity';

import kiteTypes from './schemas/kite/kiteTypes';
import rodTypes from './schemas/rod/rodTypes';
import twineTypes from './schemas/twine/twineTypes';
import reelTypes from './schemas/reel/reelTypes';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...kiteTypes, ...rodTypes, ...reelTypes, ...twineTypes],
};
