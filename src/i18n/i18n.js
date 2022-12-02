import {I18n as I18NJS} from 'i18n-js';
import {getLocales} from 'expo-localization';

import en from './locales/en';
import fr from './locales/fr';

const locales = getLocales();

export const I18n = new I18NJS({fr, en});

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.enableFallback = true;
