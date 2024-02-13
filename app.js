const express = require('express');
const connectdb = require('./config/db');
const app = express();
const path = require('path');
require('dotenv').config();
connectdb();

app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/user',require('./routes/user'));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
