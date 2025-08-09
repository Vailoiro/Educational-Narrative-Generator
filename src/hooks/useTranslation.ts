import { useMemo } from 'react';
import { useLanguageStore } from '../lib/store';
import { getTranslations, Translations } from '../lib/translations';
import { SUPPORTED_LANGUAGES } from '../lib/constants';

function getNestedProperty(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

function interpolateString(template: string, variables: Record<string, any> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : match;
  });
}

function handlePluralization(template: string, variables: Record<string, any> = {}): string {
  const pluralRegex = /\{(\w+),\s*plural,\s*one\s*\{([^}]+)\}\s*other\s*\{([^}]+)\}\}/g;
  
  return template.replace(pluralRegex, (match, countKey, singular, plural) => {
    const count = variables[countKey];
    if (count === undefined) return match;
    return count === 1 ? singular : plural;
  });
}

export function useTranslation() {
  const { currentLanguage, setLanguage, isPortuguese, isEnglish } = useLanguageStore();

  const translations = useMemo(() => {
    return getTranslations(currentLanguage);
  }, [currentLanguage]);

  const t = useMemo(() => {
    return (key: string, variables?: Record<string, any>): string => {
      let template = getNestedProperty(translations, key);
      
      if (variables) {
        template = handlePluralization(template, variables);
        template = interpolateString(template, variables);
      }
      
      return template;
    };
  }, [translations]);

  const switchLanguage = () => {
    const newLanguage = isPortuguese ? SUPPORTED_LANGUAGES.EN : SUPPORTED_LANGUAGES.PT;
    setLanguage(newLanguage);
  };

  const setPortuguese = () => {
    setLanguage(SUPPORTED_LANGUAGES.PT);
  };

  const setEnglish = () => {
    setLanguage(SUPPORTED_LANGUAGES.EN);
  };

  return {
    t,
    currentLanguage,
    isPortuguese,
    isEnglish,
    switchLanguage,
    setPortuguese,
    setEnglish,
    setLanguage,
  };
}

export type UseTranslationReturn = ReturnType<typeof useTranslation>;
export type TranslationFunction = UseTranslationReturn['t'];