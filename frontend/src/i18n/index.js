import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import viTranslation from './locales/vi.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      vi: {
        translation: viTranslation
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    nsSeparator: ':::',
    keySeparator: '::'
  });

// This is just a test function, to be removed.
window.i18n = i18n;

export default i18n;
