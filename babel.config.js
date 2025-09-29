module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false, // set to true if you want to enforce all variables in .env.example
        allowUndefined: true,
      },
    ],
  ],
};
