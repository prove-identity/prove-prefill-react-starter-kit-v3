import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";

export type SupportedLangs = 'en' | 'es';

interface LangContextType {
  lang: SupportedLangs;
  changeLang: (language: SupportedLangs) => void;
}

const LangContext = createContext<LangContextType>({
    lang: 'en',
    changeLang: (language: SupportedLangs) => {},
});

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: { children: any }) => {
    const location = useLocation();
    const { i18n } = useTranslation();
    const searchParams = new URLSearchParams(location.search);
    const initialLang = searchParams.get('lang') || localStorage.getItem('appLanguage') || "en";
    const [lang, setLang] = useState<SupportedLangs>(initialLang as SupportedLangs);

    useEffect(() => {
        i18n.changeLanguage(lang).catch(error => console.error('Language change error:', error));
    }, [lang, i18n]);

    const changeLang = (language: SupportedLangs) => {
        setLang(language);
        localStorage.setItem('appLanguage', language);
        i18n.changeLanguage(language).catch(error => console.error('Language change error:', error));
    };

    return (
        <LangContext.Provider value={{ lang, changeLang }}>
            {children}
        </LangContext.Provider>
    );
};
