import type { SchemaTypeDefinition } from "sanity";

import twine from "./twine";
import twineDiameters from "./twine-diameters";

export default [twine, twineDiameters] satisfies SchemaTypeDefinition[];
