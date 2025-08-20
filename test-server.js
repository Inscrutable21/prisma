import express from 'express';
const app = express();
const PORT = 3001; // Using a different port to avoid conflicts

// A single, simple route
app.get('/', (req, res) => {
  res.send('Test server is working!');
});

app.listen(PORT, () => {
  console.log(`✅ Test server is running on http://localhost:${PORT}`);
});