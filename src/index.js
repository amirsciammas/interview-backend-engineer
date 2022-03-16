const express = require("express");
//TODO DB Configuration const { db }  = require('./configs/dbConfig');
const app = express();
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const helmet = require("helmet");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./documentation/swagger-doc.json");
const swaggerOptions = require("./documentation/swagger-options");
const apiRoute = require("./routes/apiRoute");
const httpCodes = require("./utils/httpcodes");
const { returnError } = require("./middlewares/errorHandler");

app.use(cors());
app.options("*", cors());
app.use(
  morgan("combined", {
    stream: fs.createWriteStream(path.join(__dirname, "server.log")),
  })
);
app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.json({ limit: "1mb" }));
app.use(returnError);
app.use("/favicon.ico", express.static("assets/adidas-favicon.ico"));

// API Documentation
app.use(
  "/wiki",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);

// API Route
app.use("/api", apiRoute);

app.use("*", (req, res, next) =>
  res.status(httpCodes.NOT_FOUND).json({
    code: httpCodes.NOT_FOUND,
    msg: "failure - No such url found on this server",
    records: [],
  })
);

module.exports = app;
