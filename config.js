require('dotenv').config();
const config = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/opiniion-test-task',
    port: process.env.PORT || 3000
};

module.exports = config;