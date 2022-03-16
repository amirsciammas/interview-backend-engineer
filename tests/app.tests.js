const { app } = require('../src/server');
const supertest = require('supertest');
const dotenv = require('dotenv');
dotenv.config();

const testApplication = () => supertest(app);

//TODO - Add test cases