require('dotenv').config();
const config = {
    mongoUri: process.env.MONGO_URL || "mongo://localhost",
    weatherApi: process.env.OPEN_WEATHER_TOKEN || '12345567',
}

module.exports = {
    config
}