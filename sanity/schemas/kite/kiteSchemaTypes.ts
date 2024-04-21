import { SchemaTypeDefinition } from "sanity";

import kite from "./kite";
import kiteMaterials from "./kiteMaterials";

export default [kite, kiteMaterials] satisfies SchemaTypeDefinition[];
