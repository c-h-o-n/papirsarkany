import { SchemaTypeDefinition } from 'sanity';
import rods from './rodDocument';
import diameters from './diameters';
import lengths from './lengths';

export default [rods, diameters, lengths] satisfies SchemaTypeDefinition[];
