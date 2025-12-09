const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable web support for Replit environment
config.transformer = {
  ...config.transformer,
  experimentalImportSupport: false,
  inlineRequires: false,
};

// Configure server to bind to all interfaces for Replit preview
config.server = {
  ...config.server,
  port: 5000,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Set CORS headers for Replit preview
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', '*');
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
