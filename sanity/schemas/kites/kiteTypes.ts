import { SchemaTypeDefinition } from 'sanity';
import kites from './kites';
import kiteMaterials from './kiteMaterials';

export default [kites, kiteMaterials] satisfies SchemaTypeDefinition[];
