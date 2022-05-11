const supertest = require('supertest');
const app = require('../../src/server/server');
const nock = require('nock');
const request = require('supertest')(app);


describe("Testing the user API", () => {

    before(() => {
        nock('api/')
            .get('/users')
            .reply(200, mockedAllUserResponse);
    });
    it('should fetch all users', function (done) {
        request
            .get('/api/users')
            .expect(200, done);
    });



});

describe("Testing the user API to fetch by Id", () => {

    before(() => {
        nock('api/')
            .get('/users/1')
            .reply(200, mockedUserByIdResponse);
    });
    it('should fetch all users', function (done) {
        request
            .get('/api/users/1')
            .expect(200, done);

    });



});


var mockedAllUserResponse = {
    "users": [
        {
            "id": 2,
            "name": "Imagine Dragons",
            "email": "imgDra@abc.biz",
            "address_geo_lat": "-67.3159",
            "address_geo_lng": "11.1496"
        }
    ]
}

var mockedUserByIdResponse = {
    "user":{
            "id": 2,
            "name": "Imagine Dragons",
            "email": "imgDra@abc.biz",
            "address_geo_lat": "-67.3159",
            "address_geo_lng": "11.1496"
        }
}
