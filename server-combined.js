require('dotenv').config();
const path = require('path');
const express = require('express');
const next = require('next');
const { createApiApp } = require('./backend-server-ultra');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({
  dev,
  dir: path.join(__dirname, 'growth-engine-landing-page'),
});

const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    const server = express();

    // Mount API under /api
    const apiApp = createApiApp();
    server.use('/api', apiApp);

    // Next.js pages and assets
    server.all('*', (req, res) => handle(req, res));

    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || '0.0.0.0';
    server.listen(PORT, HOST, () => {
      console.log(`🚀 LaunchAlone combined server ready on http://${HOST}:${PORT}`);
      console.log('   → API: /api/*');
      console.log('   → Frontend: Next.js app');
    });
  })
  .catch((error) => {
    console.error('Failed to start combined server:', error);
    process.exit(1);
  });
