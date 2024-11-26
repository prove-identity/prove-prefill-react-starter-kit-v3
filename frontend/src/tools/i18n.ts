import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import identityEn from './locale/en/identity.json';
import identityEs from './locale/es/identity.json';

i18n.use(initReactI18next).init({
    lng: "en",     // Set the initial language of the App
    fallbackLng: "en",
    ns: ['identity'],
    defaultNS: 'identity',
    resources: {
        en: {
            identity: identityEn
        },
        es: {
            identity: identityEs
        }
    }
});