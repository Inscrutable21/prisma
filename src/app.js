import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './backend/routes/auth.js';
import { authenticateToken } from './backend/middleware/auth.js';

// Load environment variables
dotenv.config();

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies
app.use(express.static(path.join(__dirname, 'frontend'))); // To serve static files like HTML, CSS

// API Routes
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'This is protected data for your profile!',
    user: req.user
  });
});

// Serve frontend pages
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'register.html'));
});

// A catch-all route to redirect to the login page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;