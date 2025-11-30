const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable web support for Replit environment
config.transformer = {
  ...config.transformer,
  experimentalImportSupport: false,
  inlineRequires: false,
};

module.exports = config;
