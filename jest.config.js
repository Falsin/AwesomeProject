const config = {
  preset: "react-native",
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|pinar|react-native-vector-icons|native-base)/)"
  ],
  globals: {
    __DEV__: true
  },
};

module.exports = config;