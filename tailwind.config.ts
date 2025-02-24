import tailwindTypography from "@tailwindcss/typography";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

import daisyuiConfig from "./daisyui.config";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        "foxpost-red": "#a82220",
      },
    },
  },
  plugins: [daisyui, tailwindTypography],
  daisyui: { ...daisyuiConfig },
} satisfies Config;
