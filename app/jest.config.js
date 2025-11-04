module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'], 
  moduleNameMapper: {
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|aac|ogg|wav|mp3|pdf)$':
      require.resolve('react-native/Libraries/Image/AssetRegistry'),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@reduxjs|immer|uuid|react-native-safe-area-context|react-native-screens|react-redux)',
  ],
};