module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-native', '@typescript-eslint', 'import', 'react-hooks', '@tanstack/query'],
  rules: {
    'no-catch-shadow': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    radix: 0,
    'react-native/no-inline-styles': 2,
    'react-native/no-single-element-style-arrays': 2,
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unnecessary-condition': 'error',
  },
  env: {
    'react-native/react-native': true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react/display-name': 'off',
        'react-hooks/exhaustive-deps': [
          'error',
          // Support custom useBlahCallback() hooks
          { additionalHooks: '(use\\w+Callback)' },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      'babel-module': {
        '@core': './app/core',
        '@ui': './app/core/ui',
        '@features': './app/features',
        '@feature': './app/features',
        '@types': './app/types',
        '@tests': './app/tests',
        '@app': './app',
      },
    },
  },
};
