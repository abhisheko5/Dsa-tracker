import express from 'express';
import cookieParser from 'cookie-parser';
const app=express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import userRoutes from './routes/user.routes.js';
import problemRoutes from './routes/problem.routes.js';
import revisionRoutes from './routes/revision.route.js';
import problemStatusRoutes from './routes/problemStatus.route.js';

app.use('/api/users', userRoutes);
app.use('/api/problem', problemRoutes);
app.use('/api/revision',revisionRoutes);
app.use('/api/status',problemStatusRoutes);










export default app;