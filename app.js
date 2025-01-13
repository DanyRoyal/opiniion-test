const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config');
const customerLogsRouter = require('./routes/customerLogs');
const locationRouter = require('./routes/location');
const errorHandler = require('./middleware/errorHandler');

const app = express();

mongoose.set('strictQuery', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', customerLogsRouter);
app.use('/api', locationRouter);

app.use(errorHandler);

async function connectDB() {
    try {
        if (!config.mongoURI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }

        mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}
async function startServer() {
    try {
        await connectDB();

        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();