const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet'); 
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/documentation/swagger-doc.json');
const swaggerOptions = require('./src/documentation/swagger-options');
const apiRoute = require('./src/routes/apiRoute');
const httpCodes = require('./src/utils/httpcodes');
const { returnError } = require('./src/middlewares/errorHandler');

app.use(cors());
app.options("*",cors());
app.use('/favicon.ico', express.static('assets/adidas-favicon.ico'));
app.use(morgan("combined", { stream: fs.createWriteStream(path.join(__dirname,"logs/server.log"))}));
app.use(helmet());
app.use(express.json({ limit:'1mb'}));
app.use(returnError);
app.use('/favicon.ico', express.static('../assets/adidas-favicon.ico'));
// API Documentation
app.use('/wiki',swaggerUi.serve,swaggerUi.setup(swaggerDocument,swaggerOptions));

// API Route
app.use('/api/users',apiRoute);

app.use('*', (req,res,next) => 
res.status(httpCodes.NOT_FOUND).json({
    code: httpCodes.NOT_FOUND,
    msg: 'failure - No such url found on this server',
    results:[]
})
);

module.exports = app;