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
app.use(cors());

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Configure session middleware
app.use(
    session({
      secret: process.env.SESSION_SECRET, // replace with your secret key
      resave: false, // don't save session if unmodified
      saveUninitialized: true, // save uninitialized sessions
      cookie: { 
        secure: false, // set to true if using HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
       }, 
    })
  );

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

export {app}
