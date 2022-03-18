const { app } = require('../server');
const supertest = require('supertest');
const dotenv = require('dotenv');
dotenv.config();

const testApplication = () => supertest(app);


