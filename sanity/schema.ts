import { type SchemaTypeDefinition } from 'sanity';
import kiteTypes from './schemas/kites/kiteTypes';
import reels from './schemas/reels/reels';
import rodTypes from './schemas/rods/rodTypes';
import twineTypes from './schemas/twines/twineTypes';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...kiteTypes, ...rodTypes, reels, ...twineTypes]
};
