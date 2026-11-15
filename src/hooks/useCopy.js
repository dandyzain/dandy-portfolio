import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { uiCopy } from '../data/uiCopy';

/** Returns { language, t (legacy translations), ui (new interface copy) }. */
export function useCopy() {
  const { language } = useLanguage();
  return {
    language,
    t: portfolioData.translations[language],
    ui: uiCopy[language],
  };
}
