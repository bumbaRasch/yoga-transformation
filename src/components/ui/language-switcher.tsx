'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useLanguage, useTranslations, type Locale } from '@/contexts/language-context';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageOption {
  code: Locale;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: 'en', nativeName: 'English', },
  { code: 'de', nativeName: 'Deutsch', },
  { code: 'es', nativeName: 'Español', }
];

export function LanguageSwitcher() {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const { setLocale } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleLanguageSelect = (langCode: Locale) => {
    setLocale(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
          bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/30
          hover:bg-white/20 dark:hover:bg-gray-700/50 hover:border-gray-300/30 dark:hover:border-gray-600/40
          text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
          transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500/50
          ${isOpen ? 'bg-white/20 dark:bg-gray-700/50 border-gray-300/30 dark:border-gray-600/40' : ''}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={t('accessibility.selectLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3 h-3" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`
              absolute top-full right-0 mt-2 min-w-[200px] z-50
              bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200/20 dark:border-gray-700/30
              backdrop-blur-lg overflow-hidden
            `}
            role="listbox"
            aria-label={t('accessibility.languageOptions')}
          >
            {languages.map((language, index) => (
              <motion.button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`
                  w-full px-4 py-3 flex items-center justify-between text-left
                  hover:bg-gray-50 dark:hover:bg-gray-700/50
                  text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
                  transition-colors duration-150 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700/50
                  ${locale === language.code ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' : ''}
                `}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                role="option"
                aria-selected={locale === language.code}
              >
                <div className="flex items-center gap-3">

                  <div className="flex flex-col">
                    <span className="font-medium text-sm">
                      {language.nativeName}
                    </span>
                  </div>
                </div>
                {locale === language.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="text-purple-600 dark:text-purple-400"
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}