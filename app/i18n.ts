import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './lib/translations';
import LanguageDetector from 'i18next-browser-languagedetector';

export const AVAILABLE_LANGUAGES = ['en', 'he'] as const;
export type AvailableLanguage = (typeof AVAILABLE_LANGUAGES)[number];

export function createI18nInstance() {
  const i18nInstance = i18n.createInstance();

  const detectionOptions = {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  };

  i18nInstance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: AVAILABLE_LANGUAGES[0],
      fallbackLng: AVAILABLE_LANGUAGES[0],
      supportedLngs: AVAILABLE_LANGUAGES,
      detection: detectionOptions,
      interpolation: {
        escapeValue: false,
      },
    });

  return {
    i18nInstance,
    changeLanguage: (lang: AvailableLanguage) => {
      localStorage.setItem('i18nextLng', lang);
      return i18nInstance.changeLanguage(lang);
    },
  };
}

const { i18nInstance, changeLanguage } = createI18nInstance();

export { changeLanguage };
export default i18nInstance;
