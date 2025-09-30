const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

//Import Routes
const userRoutes = require('./routes/userRoutes');

const app = express();

// 🔐 Security & Performance Middleware
app.use(helmet());                        //sets secure headers to req
app.use(compression());                   //gzip compression for faster responses
app.use(cors());                          // enables cors for frontend access

// 📊 Logging (only in development)
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Body Parsing
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//mounting the routes
app.use( '/api/users', userRoutes)

//status error handler
app.use( (req, res, next) => {
    res.status(404).json({ message : 'Route not found'  })
});

// centralised error handler
app.use( (err, req, res, next) => {
    console.log('Error:', err.message);
    res.status(err.status || 500).json({
        message : err.message || 'Internal Server Error'
    });

});

module.exports = app;
