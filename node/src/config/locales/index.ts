/* eslint-disable @typescript-eslint/ban-types */
import en from './en';
import pt from './pt';
import ILocale from './ILocale';

type localeOptions = {
  [key: string]: ILocale;
};

const locales: localeOptions = {
  en,
  pt,
};

const defaultLocale = process.env.APP_LOCALE
  ? locales[process.env.APP_LOCALE]
  : en;

export default defaultLocale;
