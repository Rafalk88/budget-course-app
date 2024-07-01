import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    otherLanguages: ['pl'],
    fallbackLng: 'en',
    debug: false,
    saveMissing: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          appContent: {
            metaTags: {
              title: 'Budget app - main',
              desc: 'Main site of an application',
            },
            nav: {
              Homepage: 'Homepage',
              Budget: 'Budget',
            },
          },
        },
      },
      pl: {
        translation: {
          appContent: {
            metaTags: {
              title: 'Budget app - strona główna',
              desc: 'Strona główna aplikacji',
            },
            nav: {
              Homepage: 'Strona Główna',
              Budget: 'Budżet',
            },
          },
        },
      },
    },
  });

export default i18n;
