import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseRoute, setUrlLanguage } from '../lib/projectUrl';

const LanguageContext = createContext();
const STORAGE_KEY = 'dandy_portfolio_lang';

// The URL is the source of truth (/id/... = Indonesian). Without a prefix we
// fall back to the visitor's saved choice, then English.
function initialLanguage() {
  if (parseRoute()?.lang === 'id') return 'id';
  try {
    return localStorage.getItem(STORAGE_KEY) === 'id' ? 'id' : 'en';
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = language === 'id' ? 'id' : 'en';
    setUrlLanguage(language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
