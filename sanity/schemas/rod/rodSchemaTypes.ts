import { SchemaTypeDefinition } from "sanity";
import rod from "./rod";
import rodDiameters from "./rodDiameters";
import lengths from "./lengths";

export default [rod, rodDiameters, lengths] satisfies SchemaTypeDefinition[];
