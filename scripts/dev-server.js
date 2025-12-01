#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Get the project root directory
const projectRoot = path.resolve(__dirname, '..');
const expoPath = path.join(projectRoot, 'node_modules', '.bin', 'expo');

// Run expo start with web support using local installation
const expoProcess = spawn(expoPath, [
  'start',
  '--web',
  '--port', '5000',
  '--host', 'lan',
  '--clear'
], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development',
    EXPO_PUBLIC_URL: 'true',
    EXPO_SKIP_MANIFEST_VALIDATION: 'true',
    EXPO_DEBUG: 'true'
  }
});

expoProcess.on('exit', (code) => {
  process.exit(code || 0);
});
