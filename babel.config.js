module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@app': './app',
            '@ui': './app/core/ui',
            '@core': './app/core',
            '@feature': './app/features',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
