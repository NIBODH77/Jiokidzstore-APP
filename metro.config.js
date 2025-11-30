const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure web bundler settings
config.resolver.sourceExts = ['web.ts', 'web.tsx', 'web.js', 'web.jsx', 'ts', 'tsx', 'js', 'jsx', 'json', 'mjs'];

// Disable strict CORS for development
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Allow all origins for development
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
      } else {
        middleware(req, res, next);
      }
    };
  },
};

module.exports = config;
