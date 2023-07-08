import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/todoapp';

mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
