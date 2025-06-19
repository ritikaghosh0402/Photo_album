const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./config/db');
const photoRoutes = require('./routes/photoRoutes');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/photos', photoRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
});

