import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import studentRoutes from './routes/student.route.js';
import cookieParser from "cookie-parser";
import databaseConnection from "./config/db.config.js";
import session from "express-session";

dotenv.config();
const app = new express();

app.use(express.json());
// app.use(cors());

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST","PUT","DELETE","PATCH"],
      credentials: true,
    })
  );

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

export {app}
