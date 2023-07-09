const config = {
  preset: "jest-expo",
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@rneui)|expo(nent)?|@expo(nent)?/.*/)'
  ],
  globals: {
    __DEV__: true
  },
};

module.exports = config;