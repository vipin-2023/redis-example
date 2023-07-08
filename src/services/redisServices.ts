import { promisify } from 'util';
import redisClient from '../config/redis';

export const getFromCache = promisify(redisClient.get).bind(redisClient);
export const setToCache = promisify(redisClient.set).bind(redisClient);
