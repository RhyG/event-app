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
            '@domains': './app/domains',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
