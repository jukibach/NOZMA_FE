import i18n from 'i18next'

import { initReactI18next } from 'react-i18next'

import enTranslation from '@constants/locales/en/translation.json'

import frTranslation from '@constants/locales/fr/translation.json'
import { Language, LocalDataClass } from '@data-class/LocalDataClass'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },

    fr: {
      translation: frTranslation,
    },
  },
  lng: LocalDataClass.language, // Set the initial language from local storage
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
})

// Listen for language changes and save to local storage
i18n.on('languageChanged', (lng: Language) => {
  LocalDataClass.language = lng
})

export default i18n
