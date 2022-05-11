var express = require("express")
var app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../swagger.json');
const listener = app.listen(3000, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

app.use('/api', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = app;
