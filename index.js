const http = require('http');
const sequelize = require('./src/config/database/database');
const app = require('./app');

sequelize.sync()
          .then(() => console.log("connected to db"))
          .catch(err => console.error(err)); 

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);