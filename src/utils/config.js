const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 7000,
  APP_ENV: process.env.APP_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  MONGO_URL: process.env.MONGO_URL,
  APP_HOST_URL: process.env.APP_HOST_URL,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_FROM_NUMBER: process.env.TWILIO_FROM_NUMBER
};
