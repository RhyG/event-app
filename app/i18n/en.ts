export const en = {
  homeScreen: {
    upcomingEvents: 'Upcoming Events',
    previousEvents: 'Previous Events',
    createNewEvent: 'Create new event',
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    createAccount: 'Create an account',
  },
} as const;

export type EnglishTxns = typeof en;
