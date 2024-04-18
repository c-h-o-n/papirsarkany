import { setLocale } from 'yup';

setLocale({
  string: {
    email: 'Érvénytelen email cím',
  },
  mixed: {
    required: 'Kötelező mező',
  },
});
