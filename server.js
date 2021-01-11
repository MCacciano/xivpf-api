const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

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

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// set security headers
app.use(helmet());

// prevent XSS attacks
app.use(xss());

// cors
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute
  max: 100
});

app.use(limiter);

// prevent http param pollution
app.use(hpp());

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
