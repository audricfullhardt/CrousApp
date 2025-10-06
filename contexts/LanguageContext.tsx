import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import frTranslations from '@/app/i18n/fr.json';
import enTranslations from '@/app/i18n/en.json';

export type Language = 'fr' | 'en';
export type Translations = typeof frTranslations;
const translations: Record<Language, Translations> = { 
  fr: frTranslations, 
  en: enTranslations 
};


type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('fr');

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    // Utiliser le mapping pour convertir l'ancienne clé en nouvelle clé
    const mappedKey = key;
    const keys = mappedKey.split('.');
    let translation: any = translations[language];
    
    for (const k of keys) {
      translation = translation?.[k];
      if (!translation) return key;
    }
    
    if (params) {
      // Gestion simple du remplacement de variables
      let result = Object.entries(params).reduce((acc, [key, value]) => {
        return acc.replace(`{${key}}`, value.toString());
      }, translation);
      
      // Gestion basique des pluriels ICU MessageFormat
      if (typeof params.count === 'number') {
        const count = params.count;
        // Remplacer les patterns ICU plural simples
        result = result.replace(/{count, plural, =0 {([^}]+)} =1 {([^}]+)} other {([^}]+)}}/g, (_match: string, zero: string, one: string, other: string) => {
          if (count === 0) return zero;
          if (count === 1) return one.replace('#', count.toString());
          return other.replace('#', count.toString());
        });
      }
      
      return result;
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 