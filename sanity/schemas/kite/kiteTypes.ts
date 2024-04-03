import { SchemaTypeDefinition } from 'sanity';
import kites from './kiteDocument';
import kiteMaterials from './kiteMaterials';

export default [kites, kiteMaterials] satisfies SchemaTypeDefinition[];
