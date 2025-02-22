const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // ✅ Load environment variables first

const app = express();  // ✅ Initialize app BEFORE using it
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Middleware
app.use(cors({ origin: 'https://front-blue-rho.vercel.app/' })); // Allow frontend requests
app.use(express.json()); // Enable JSON parsing

// ✅ Routes
const todoRoutes = require('./routes/todoRoutes'); 
app.use('/api/todos', todoRoutes);

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
