import type { SchemaTypeDefinition } from 'sanity';

import kite from './kite';
import kiteMaterials from './kite-materials';

export default [kite, kiteMaterials] satisfies SchemaTypeDefinition[];
