import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;  // ✅ FIXED: For Render compatibility

// ✅ FIXED: Proper CORS configuration
app.use(cors({
  origin: [
    'https://resume-craft.vercel.app',
    'http://localhost:5173',
    'https://resumexpert-frontend.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// ✅ FIXED: Simplified uploads route
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Root Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'ResumeCraft API Server',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      resume: '/api/resume',
      docs: 'https://github.com/raki225/ResumeCraft'
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});