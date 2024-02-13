const express = require('express');
const connectdb = require('./config/db');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();
connectdb();

app.use(express.json());
-app.use(express.urlencoded({ extended: false}));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/user',require('./routes/user'));
app.use(cors())
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://phone-comparor.onrender.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
})
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
