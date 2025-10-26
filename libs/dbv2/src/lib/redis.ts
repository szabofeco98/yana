import { createClient, RedisClientType, RedisDefaultModules } from 'redis';

export const redisClient: RedisClientType<RedisDefaultModules> = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();
