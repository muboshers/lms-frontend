import { useTranslation } from 'react-i18next';

export default function useLocales() {
  const { t, i18n } = useTranslation();

  const languageChange = (newLang) => i18n.changeLanguage(newLang);

  return {
    t,
    onChange: languageChange,
  };
}
