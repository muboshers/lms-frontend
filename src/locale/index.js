import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { baseURL, isProductionMode } from 'src/contants';

import enJSON from './en.json';
import ruJSON from './ru.json';
import uzJSON from './uz.json';

const user = JSON.parse(localStorage.getItem('user'));

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: ['ru', 'en', 'uz'],
    fallbackLng: 'en',
    debug: !isProductionMode,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: enJSON },
      ru: { translation: ruJSON },
      uz: { translation: uzJSON },
    },
    detection: {
      order: [
        'htmlTag',
        'querystring',
        'path',
        'cookie',
        'localStorage',
        'sessionStorage',
        'subdomain',
      ],
      caches: ['cookie', 'localStorage'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
    },
    backend: {
      loadPath: `${baseURL}/v1/api/localization/get?language_name={{lng}}`,
    },
  });

i18n.services.backendConnector.backend.options.customHeaders = {
  Authorization: `Bearer ${user?.data?.token}`,
};

export default i18n;
