import type { SchemaTypeDefinition } from "sanity";
import lengths from "./lengths";
import rod from "./rod";
import rodDiameters from "./rod-diameters";

export default [rod, rodDiameters, lengths] satisfies SchemaTypeDefinition[];
