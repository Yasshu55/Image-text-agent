import {Redis} from 'ioredis'

const redisClient = new Redis(process.env.REDIS_URL)

redisClient.connect(() => {
    console.log('Redis client connected');
});


export default redisClient