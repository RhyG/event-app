module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@/ui": "./app/core/ui",
          },
        },
      ],
    ],
    extends: ["plugin:import/errors", "plugin:import/warnings"],
    settings: {
      "import/resolver": {
        "babel-module": {},
      },
    },
  };
};
