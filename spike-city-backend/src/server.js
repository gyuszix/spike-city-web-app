//backend/src/server.js
import express from 'express';
import cors from 'cors';
import events from '../api/events.route.js';
import admin from '../api/admin.route.js';

const app = express();

/**
 * Allowed origins for CORS requests.
 */
const allowedOrigins = [
  'http://localhost:3000',
  'https://volleyball-app-frontend.ue.r.appspot.com', // JORDAN's FRONTEND
  'https://volleyball-app-frontend-mk1.uw.r.appspot.com', //JULES'S FRONTEND
  'https://spike-city-frontend.ue.r.appspot.com',
  process.env.FRONTEND_URL, // Render static site URL, set via env var so no redeploy is needed if it changes
].filter(Boolean);

/**
 * CORS configuration to whitelist origins and handle OPTIONS preflight.
 */
const corsOptions = {
  origin: function (origin, callback) {
    console.log('CORS check for origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware BEFORE your routes to ensure headers are sent correctly
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

// Remove or override COOP/COEP headers to avoid blocking postMessage
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

// Body parsing middleware
app.use(express.json());

// ensure CORS is applied before this
app.use('/api/v1/events', events);
app.use('/api/v1/admin', admin);

/**
 * Catch-all 404 handler for unknown routes.
 */
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

/**
 * Error handling middleware to add CORS headers on errors
 */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");

  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
