import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      welcome: "Welcome to Lametna",
      login: "Log In",
      register: "Create Account",
      home: "Home",
      games: "Games",
      social: "Social",
      profile: "Profile",
      shop: "Shop",
      search: "Search...",
      party: "Party",
      settings: "Settings",
      logout: "Log Out",
    }
  },
  ar: {
    translation: {
      welcome: "مرحباً بك في لمتنا",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      home: "الرئيسية",
      games: "الألعاب",
      social: "المجتمع",
      profile: "الملف الشخصي",
      shop: "المتجر",
      search: "بحث...",
      party: "المجموعة",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
