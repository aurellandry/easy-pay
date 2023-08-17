import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from '../config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import establishmentRoutes from './routes/establishmentRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/establishments', establishmentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Easy-pay app listening on port ${port}!`);
});
