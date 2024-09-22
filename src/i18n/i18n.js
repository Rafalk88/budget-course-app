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
              budgetTitle: 'Budget app - budget',
              budgetDesc: 'Application budget side webpage',
            },
            nav: {
              Homepage: 'Homepage',
              Budget: 'Budget',
            },
            buttons: {
              addTransaction: 'Add new transaction',
            },
          },
          parentCategory: {
            Othercategories: 'Other categories',
          },
          suspenseErrorBoundary: {
            title: 'Something went wrong!',
            resetBtn: 'Try again!',
          },
        },
      },
      pl: {
        translation: {
          appContent: {
            metaTags: {
              title: 'Budget app - strona główna',
              desc: 'Strona główna aplikacji',
              budgetTitle: 'Budget app - budżet',
              budgetDesc: 'Strona budżetowa aplikacji',
            },
            nav: {
              Homepage: 'Strona Główna',
              Budget: 'Budżet',
            },
            buttons: {
              addTransaction: 'Dodaj nową transakcję',
            },
          },
          parentCategory: {
            Othercategories: 'Pozostałe',
          },
          suspenseErrorBoundary: {
            title: 'Coś poszło nie tak!',
            resetBtn: 'Ponów próbę!',
          },
        },
      },
    },
  });

export default i18n;
