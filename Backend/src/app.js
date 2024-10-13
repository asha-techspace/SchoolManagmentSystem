import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

//Routes
app.use('/api/auth', authRoutes);

export {app}
