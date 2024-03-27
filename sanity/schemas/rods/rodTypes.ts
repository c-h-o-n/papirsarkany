import { SchemaTypeDefinition } from 'sanity';
import rods from './rods';
import diameters from './diameters';
import lengths from './lengths';

export default [rods, diameters, lengths] satisfies SchemaTypeDefinition[];
