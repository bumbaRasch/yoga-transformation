'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import translation files
import enTranslations from '../messages/en.json';
import deTranslations from '../messages/de.json';
import esTranslations from '../messages/es.json';

export type Locale = 'en' | 'de' | 'es';

interface LanguageContextType {
  locale: Locale;
  translations: typeof enTranslations;
  setLocale: (locale: Locale) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const translations = {
  en: enTranslations,
  de: deTranslations,
  es: esTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export function LanguageProvider({ children, defaultLocale = 'en' }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Load saved locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'de' || savedLocale === 'es')) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    
    // Update document language
    document.documentElement.lang = newLocale;
  };

  // Translation function with nested key support and variable interpolation
  const t = (key: string, variables?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: unknown = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = (value as Record<string, unknown>)[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }
    
    if (typeof value !== 'string') {
      return key;
    }

    // Handle variable interpolation
    if (variables) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
        return variables[variable]?.toString() || match;
      });
    }

    return value;
  };

  const contextValue: LanguageContextType = {
    locale,
    translations: translations[locale],
    setLocale,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Convenience hooks
export function useTranslations() {
  const { t } = useLanguage();
  return t;
}

export function useLocale() {
  const { locale } = useLanguage();
  return locale;
}