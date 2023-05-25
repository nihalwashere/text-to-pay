const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const expressRequestId = require("express-request-id")();
const cors = require("cors");
const { PORT, MONGO_URL } = require("./src/utils/config");
const logger = require("./src/utils/logger");

const app = express();

app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

app.use(expressRequestId);

morgan.token("requestId", request => request.id);

app.use(
  morgan(":requestId :method :url :status :response-time ms", {
    stream: {
      write: message => logger.http(message)
    }
  })
);

const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

app.use(express.json({ verify: rawBodySaver, limit: "50mb" }));
app.use(
  express.urlencoded({ verify: rawBodySaver, extended: true, limit: "50mb" })
);
app.use(express.raw({ verify: rawBodySaver, type: "*/*", limit: "50mb" }));

app.use(express.static("public"));

app.use(cors());

const twilioWebhooks = require("./src/api/v1/webhooks/twilio");

// ROUTES

app.use("/v1/webhooks/twilio", twilioWebhooks);

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Howdy!!!" });
});

const server = app.listen(PORT, () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(MONGO_URL)
      .then(() => logger.info("SERVER - MongoDB Connected"))
      .catch(error =>
        logger.error("SERVER - MongoDB Connection Failed : ", error)
      );

    logger.info(`SERVER - Running on port ${PORT}`);
  } catch (error) {
    logger.error("Failed to start server -> error : ", error);
  }
});

module.exports = { app, server };
