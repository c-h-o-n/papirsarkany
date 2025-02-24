import pick from "just-pick";
import preval from "next-plugin-preval";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);
/**
 * Add only necessary theme properties to minimize client bundle size impact.
 */
const necessaryThemeKeys = [
  "screens",
] satisfies (keyof typeof fullConfig.theme)[];

const necessaryTheme = pick(fullConfig.theme, necessaryThemeKeys);

/**
 * Static version of tailwind configuration generated at build-time (in JSON format).
 * This way the amount of data gets into client bundle is minimized.
 * The full config is still ~7Kb (gzipped) prevaluate only the necessary properties of it.
 */
export default preval(necessaryTheme);
