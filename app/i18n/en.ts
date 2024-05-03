import { en as eventEn } from '@feature/events/i18n/en';
import { en as homeEn } from '@feature/home/i18n/en';

import { en as authEn } from '@core/domains/auth/i18n/en';

export const en = {
  common: {
    joinEvent: 'Join event',
    createEvent: 'Create event',
  },
  ...homeEn,
  ...eventEn,
  ...authEn,
  auth: {
    login: 'Login',
    logout: 'Logout',
    createAccount: 'Create an account',
  },
} as const;

export type EnglishTxns = typeof en;
