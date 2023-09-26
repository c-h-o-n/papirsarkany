import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import theme from 'daisyui/src/theming/themes';

const lightTheme = theme['[data-theme=light]']

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
  },
  plugins: [daisyui],
  daisyui: {
    prefix: 'd-',
    themes: [{light: {
      ...lightTheme,
      'primary': '#0ea5e9',
      'primary-content': '#fff'
    }}],
  },
};
export default config;
