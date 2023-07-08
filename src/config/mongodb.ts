import redis from 'redis';

const redisClient = redis.createClient();

redisClient.on('error', (error) => {
  console.error('Redis connection error:', error);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

export default redisClient;
