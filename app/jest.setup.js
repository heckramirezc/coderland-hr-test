require('jest-fetch-mock').enableMocks();

global.__DEV__ = true; 

jest.mock('react-native-get-random-values', () => ({
  getRandomValues: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
  }),
  NavigationContainer: ({ children }) => children,
  useRoute: jest.fn(),
}));

jest.mock('react-native', () => {
  const RND = jest.requireActual('react-native');
  RND.Alert = {
    alert: jest.fn(),
  };
  return RND;
});