
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:["https://dsatrackerwithai.netlify.app","http://localhost:5173"],
   credentials: true
}));

import userRoutes from './routes/user.routes.js';
import problemRoutes from './routes/problem.routes.js';
import revisionRoutes from './routes/revision.route.js';
import problemStatusRoutes from './routes/problemStatus.route.js';
import analyticsRoutes from './routes/analytics.route.js';
import aiRoutes from './routes/ai.routes.js';

app.use('/api/users', userRoutes);
app.use('/api/problem', problemRoutes);
app.use('/api/revision',revisionRoutes);
app.use('/api/status',problemStatusRoutes);
app.use('/api/stats',analyticsRoutes);
app.use('/api/ai',aiRoutes);
app.get("/", (req, res) => {
  res.send("✅ DSA Tracker backend is running!");
});










export default app;