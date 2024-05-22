import daisyui from 'daisyui';
import theme from 'daisyui/src/theming/themes';
import type { Config } from 'tailwindcss';

const lightTheme = theme.light;

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
  daisyui: {
    prefix: 'd-',
    themes: [
      {
        light: {
          ...lightTheme,
          primary: '#0ea5e9',
          'primary-content': '#ffffff',

          'success-content': '#f8f8f8',

          error: '#ef5258',
        },
      },
    ],
  },
};
export default config;
