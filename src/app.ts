import express from 'express';
import morgan from 'morgan';
import todoRoutes from './routes/todoRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/todos', todoRoutes);

export default app;
