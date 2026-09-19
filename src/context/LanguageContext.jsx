import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Default language is English (US)
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('dandy_portfolio_lang');
    return saved === 'id' ? 'id' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('dandy_portfolio_lang', language);
    document.documentElement.lang = language === 'id' ? 'id' : 'en-US';
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
