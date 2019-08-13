const { getDefaultConfig } = require("metro-config");

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  }
};

module.exports = (async () => {
  const {
    resolver: { sourceExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-sass-transformer")
    },
    resolver: {
      sourceExts: [...sourceExts, "scss", "sass"]
    }
  };
})();
