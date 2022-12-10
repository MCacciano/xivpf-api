import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import errorHandler from './middleware/error';
import connectDB from './config/db';

dotenv.config({ path: './config/.env' });

connectDB();

import authRoutes from './routes/auth';
// Routes

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
}
// cookie parser
app.use(cookieParser());
// body parser
app.use(express.json());
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

// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode at port ${PORT}`)
);

process.on('unhandledRejection', (err: { message: string }, promise) => {
  if (err) {
    console.error(`Error: ${err.message}`);
  }

  // server.close(process.exit(1));
});
