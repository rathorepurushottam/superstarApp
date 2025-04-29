module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ['./assets/fonts'],
    dependencies: {
      'react-native-vector-icons': {
        platforms: {
          ios: null, // Disable auto-linking for iOS to avoid font duplication issues
        },
      },
    },
  };