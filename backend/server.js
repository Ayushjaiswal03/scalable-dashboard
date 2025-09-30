const app = require('./app');
const mongoose = require('mongoose');
const redis = require('redis');
const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV === 'production' ? 'production' : 'development';
dotenv.config({path: envFile});

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI;
const REDIS_URL = process.env.REDIS_URL;

const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true, DEPRICATED
        });
        console.log('MongoDB connected');

        const redisClient = redis.createClient({url: REDIS_URL});
        await redisClient.connect()
            .then(() => console.log('Redis is connected'))
            .catch((err) => console.error('Error:', err.message));

        // console.log('Redis Connected');

        app.locals.redis = redisClient;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }catch (err) {
        console.log('Startup error:', err);

    }
};

startServer();
