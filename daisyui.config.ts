import type { Config } from 'daisyui';
import theme from 'daisyui/src/theming/themes';
const lightTheme = theme.light;

export default {
  prefix: 'd-',
  themes: [
    {
      light: {
        ...lightTheme,
        primary: '#0E7DAF',
        'primary-content': '#FFFFFF',

        'success-content': '#F8F8F8',

        error: '#EF5258',
      },
    },
  ],
} as Config;
