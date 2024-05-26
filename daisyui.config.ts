import { Config } from 'daisyui';
import theme from 'daisyui/src/theming/themes';
const lightTheme = theme.light;

export default {
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
} as Config;
