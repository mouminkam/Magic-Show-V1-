import arTranslations from "../ar.json";
import enTranslations from "../en.json";
import { i18nConfig } from "./config";

const translations = {
  ar: arTranslations,
  en: enTranslations,
};

/**
 * Get translation for a key
 * @param {string} lang - Language code (ar, en)
 * @param {string} key - Translation key
 * @param {Object} params - Parameters to replace in translation
 * @returns {string} Translated string
 */
export function t(lang, key, params = {}) {
  const langCode = lang || i18nConfig.defaultLang;
  const translation =
    translations[langCode]?.[key] ||
    translations[i18nConfig.fallbackLang]?.[key] ||
    key;

  // Replace parameters in translation
  if (Object.keys(params).length > 0) {
    return Object.keys(params).reduce((str, paramKey) => {
      return str.replace(new RegExp(`{{${paramKey}}}`, "g"), params[paramKey]);
    }, translation);
  }

  return translation;
}



