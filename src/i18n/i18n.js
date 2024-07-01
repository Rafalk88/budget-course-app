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
          parentCategory: {
            April: 'April',
            Billsandutilities: 'Bills and utilities',
            Shopping: 'Shopping',
          },
          categoryItem: {
            Internet: 'Internet',
            Mobilephone: 'Mobile phone',
            Rent: 'Rent',
            Alcohol: 'Alcohol',
            Grocery: 'Grocery',
            Chemistry: 'Chemistry',
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
          parentCategory: {
            April: 'Kwiecień',
            Billsandutilities: 'Rachunki i media',
            Shopping: 'Zakupy',
          },
          categoryItem: {
            Internet: 'Internet',
            Mobilephone: 'Telefon komórkowy',
            Rent: 'Wynajem',
            Alcohol: 'Alkohol',
            Grocery: 'Art. spożywcze',
            Chemistry: 'Art. chemiczne',
          },
        },
      },
    },
  });

export default i18n;
