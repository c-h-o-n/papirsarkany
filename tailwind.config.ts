import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';
import daisyuiConfig from './daisyui.config';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [daisyui],
  daisyui: { ...daisyuiConfig },
};
export default config;
