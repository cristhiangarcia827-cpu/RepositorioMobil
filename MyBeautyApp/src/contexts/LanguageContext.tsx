import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18n } from "i18n-js";
import { createContext, useContext, useEffect, useState } from "react";

type Language = 'es' | 'en' | 'fr' | 'de';

type LanguageContextProps = {
    language: Language;
    changeLanguage: (lng: Language) => void;

}

//1. definir diccionario
//tarea:Agregar diccionario desde translations

const translations = {
    en: { signIn: 'Sign In', welcome: 'Welcome' },
    es: { signIn: 'Iniciar Sesion', welcome: 'Bienvenido' },
    fr: { signIn: 'Connexion', welcome: 'Bienvenue' },
    de: { signIn: 'Anmelden', welcome: 'Wilkommen' },
}

//2.Crear instancia de il8n con diccionario cargado
const i18n = new I18n(translations);

//3. Definir idioma por defecto
i18n.defaultLocale = 'de';
i18n.enableFallback = true;

const LanguageContext = createContext<LanguageContextProps | null>(null);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('UseId no funciona correctamente')
    return context;
}

export const LanguageProvider = ({ Children }: { Children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>('es');

    useEffect(() => {
        const loadLanguages = async () => {
            const storedLanguage = await AsyncStorage.getItem("language");
            if (storedLanguage) {
                setLanguage(storedLanguage as Language);
                i18n.locale = storedLanguage;
            }
            else if (i18n.locale) {
                i18n.locale = i18n.defaultLocale;
            }
        }
        loadLanguages();
    })
    const changeLanguage = async (lng: Language) => {
        setLanguage(lng);
        i18n.locale = lng;
        await AsyncStorage.setItem("language", lng)
    }

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {Children}
        </LanguageContext.Provider>
    )
}

export { i18n }