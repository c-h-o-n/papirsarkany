import { SchemaTypeDefinition } from 'sanity';
import rod from './rod';
import diameters from './diameters';
import lengths from './lengths';

export default [rod, diameters, lengths] satisfies SchemaTypeDefinition[];
