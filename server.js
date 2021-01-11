const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

dotenv.config({ path: './config/.env' });

connectDB();

// Routes
const authRoutes = require('./routes/auth');
const groupsRoutes = require('./routes/groups');

const app = express();

// cookie parser
app.use(cookieParser());
// body parser
app.use(express.json());
// cors
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/groups', groupsRoutes);

// errorHandler middleware
app.use(errorHandler);

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
