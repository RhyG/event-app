export const Screens = {
  WelcomeScreen: 'WelcomeScreen',
  SignUpScreen: 'SignUpScreen',
  LoginScreen: 'LoginScreen',
  HomeScreen: 'HomeScreen',
  JoinEventScreen: 'JoinEventScreen',
  CreateEventScreen: 'CreateEventScreen',
  EventScreen: 'EventScreen',
  QRCodeScannerScreen: 'QRCodeScannerScreen',
  AccountScreen: 'AccountScreen',
} as const;

export type Screen = keyof typeof Screens;
