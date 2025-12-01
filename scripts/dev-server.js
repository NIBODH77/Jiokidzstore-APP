#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

// Run expo start with web support using local installation
const result = spawnSync('node_modules/.bin/expo', [
  'start',
  '--web',
  '--port', '5000',
  '--host', 'lan',
  '--clear'
], {
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development',
    EXPO_PUBLIC_URL: 'true',
    EXPO_SKIP_MANIFEST_VALIDATION: 'true',
    EXPO_DEBUG: 'true'
  }
});

process.exit(result.status || 0);
