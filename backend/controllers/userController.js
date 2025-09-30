// Handles logic for:

// Pagination

// Search by name

// Filter by status

// Redis caching

const { User } = require('../models/Users');

const getUser = async(req, res, next) => {
    try{
        const redisClient = req.app.locals.redis;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const status = req.query.status || '';

        const skip = (page - 1) * limit;

        // creating a cache key
        const cacheKey = `user:${page}:${limit}:${search}:${status}`;  // users:1:50:: (Page 1, limit 50, no search, no status) users:2:50:: (Page 2, limit 50, no search, no status) users:1:50:John:active (Page 1, limit 50, search for 'John', status 'active')
        const cacheData = await redisClient.get(cacheKey);

        if(cacheData){
            return res.json(JSON.parse(cacheData));
        };

        //building MongoDB query
        const query = {};
        if(search) query.$text = {$search : search};
        if(status) query.status = status;

        const users = await User.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt : -1 });

        const total = await User.countDocuments(query);

        const response = {
            page,
            limit,
            total,
            totalPages : Math.ceil( total / limit),
            users,
        }

        await redisClient.setEx( cacheKey, 60, JSON.stringify(response));

        res.json(response);

    } catch (err) { 
        next(err);
    };

};

module.exports = { getUser };