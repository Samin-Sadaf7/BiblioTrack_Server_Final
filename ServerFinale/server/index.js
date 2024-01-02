import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './routes/books.js';
import userRoutes from './routes/users.js';
const app= express();
dotenv.config();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/books',bookRoutes);
app.use('/users',userRoutes);
app.use(express.static('upload'));
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 4000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
