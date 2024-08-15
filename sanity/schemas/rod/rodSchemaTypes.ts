import { SchemaTypeDefinition } from 'sanity';
import lengths from './lengths';
import rod from './rod';
import rodDiameters from './rodDiameters';

export default [rod, rodDiameters, lengths] satisfies SchemaTypeDefinition[];
