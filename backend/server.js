// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const incidentRoutes = require('./routes/incidentRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // To accept JSON data in the body

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount Routers
app.use('/api/users', userRoutes);
app.use('/api/incidents', incidentRoutes);

const PORT = process.env.PORT || 7777;
app.listen(PORT, console.log(`Server running on port ${PORT}`));