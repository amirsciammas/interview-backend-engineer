const request = require("supertest");
const app = require("../../app");


describe("Test get user by valid id", () => {
  test("It should return user object", done => {
    request(app)
      .get("/users/1")
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
            expect.objectContaining({
                id : expect.any(Number),
                name : expect.any(String),
                email : expect.any(String),
                address_geo_lat : expect.any(Number),
                address_geo_lng : expect.any(Number),
            })
        )
        done();
      });
  });

  test("It should return empty object for unavailable id", done => {
    request(app)
      .get("/users/10000")
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
            expect.objectContaining({})
        )
        done();
      });
  });

  test("It should return user albums", done => {
    request(app)
      .get("/users/1/albums")
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
            expect.objectContaining({
              id : expect.any(Number),
              name : expect.any(String),
              email : expect.any(String),
              albums : expect.arrayContaining([
                expect.objectContaining({
                  id : expect.any(Number),
                  title : expect.any(String)
                })
              ])
            })
        )
        done();
      });
  });

  test("It should return user albums with images", done => {
    request(app)
      .get("/users/1/albums/images")
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id : expect.any(Number),
                title : expect.any(String),
                userId : expect.any(Number),
                images : expect.arrayContaining([
                  expect.objectContaining({
                    id : expect.any(Number),
                    title : expect.any(String),
                    url :  expect.any(String),
                    albumId : expect.any(Number)
                  })
                ])
              })
            ])
        )
        done();
      });
  });
});