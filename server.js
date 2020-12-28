const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

dotenv.config({ path: './config/.env' });

connectDB();

// Routes
const authRoutes = require('./routes/auth');
const groupsRoutes = require('./routes/groups');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body parser
app.use(express.json());

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/groups', groupsRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode at port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  if (err) {
    console.error(`Error: ${err.message}`);
  }

  // server.close(process.exit(1));
});
