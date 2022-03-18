const request = require("supertest");
const app = require("./index");

/**
 * Test related Get User by user id
 *
 */

describe("Test validation get user by valid userid", () => {
  test("Should return bad Request", (done) => {
    request(app)
      .get("/api/users/FY")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          code: 400,
          msg: 'failure - "userid" must be a number',
          results: [],
        });
        done();
      });
  });
});

describe("Test get user by valid userid", () => {
  test("Should return User", (done) => {
    request(app)
      .get("/api/users/1")
      .expect(200)
      .then((response) => {
        expect(response.body.results).toEqual({
          id: 1,
          name: "Leanne Graham",
          email: "Sincere@april.biz",
          address_geo_lat: -37.3159,
          address_geo_lng: 81.1496,
        });
        done();
      });
  });
});

describe("Test does not exists user by valid userid", () => {
  test("Should return any user", (done) => {
    request(app)
      .get("/api/users/10000000")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          code: 200,
          msg: "Success",
          results: "there are no record.",
        });
        done();
      });
  });
});

describe("Test get user by valid userid ", () => {
  test("Should user object check types", (done) => {
    request(app)
      .get("/api/users/10")
      .expect(200)
      .then((response) => {
        expect(response.body.results).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            email: expect.any(String),
            address_geo_lat: expect.any(Number),
            address_geo_lng: expect.any(Number),
          })
        );
        done();
      });
  });
});

/**
 * Test related Get User and Albums by user Id
 *
 */
describe("Test get User and Albums by valid user Id ", () => {
  test("Should albums object check types", (done) => {
    request(app)
      .get("/api/users/1/albums")
      .expect(200)
      .then((response) => {
        expect(response.body.results).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            email: expect.any(String),
            albums: expect.any(Array),
          })
        );
        expect(response.body.results.albums).toEqual(
          expect.objectContaining([
            {
              id: expect.any(Number),
              title: expect.any(String),
            },
          ])
        );
        done();
      });
  });
});

describe("Test get User and Albums by valid user Id 1 ", () => {
  test("Should return albums ", (done) => {
    request(app)
      .get("/api/users/1/albums")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          code: 200,
          msg: "Success",
          results: {
            id: 1,
            name: "Leanne Graham",
            email: "Sincere@april.biz",
            albums: [
              {
                id: 1,
                title: "quidem molestiae enim",
              },
              {
                id: 2,
                title: "sunt qui excepturi placeat culpa",
              },
              {
                id: 3,
                title: "omnis laborum odio",
              },
              {
                id: 4,
                title: "non esse culpa molestiae omnis sed optio",
              },
              {
                id: 5,
                title: "eaque aut omnis a",
              },
              {
                id: 6,
                title: "natus impedit quibusdam illo est",
              },
              {
                id: 7,
                title: "quibusdam autem aliquid et et quia",
              },
              {
                id: 8,
                title: "qui fuga est a eum",
              },
              {
                id: 9,
                title: "saepe unde necessitatibus rem",
              },
              {
                id: 10,
                title: "distinctio laborum qui",
              },
            ],
          },
        });

        done();
      });
  });
});

describe("Test validation get User and Albums by valid user", () => {
  test("Should return bad Request - User and Albums by valid user", (done) => {
    request(app)
      .get("/api/users/adidas/albums")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          code: 400,
          msg: 'failure - "userid" must be a number',
          results: [],
        });
        done();
      });
  });
});

/**
 * Test related about Get Albums and Images by user Id
 */
describe("Test validation get Albums and Images by valid user", () => {
  test("Should return bad Request - Albums and Images by valid user", (done) => {
    request(app)
      .get("/api/users/adidas/albums/images")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          code: 400,
          msg: 'failure - "userid" must be a number',
          results: [],
        });
        done();
      });
  });
});

describe("Test validation get Albums and Images by valid user", () => {
  test("Should return bad Request with invalid offset - Albums and Images by valid user", (done) => {
    request(app)
      .get("/api/users/1/albums/images?offset=fy")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          code: 400,
          msg: 'failure - "offset" must be a number',
          results: [],
        });
        done();
      });
  });
});

describe("Test validation get Albums and Images by valid user", () => {
  test("Should return bad Request with invalid limit - Albums and Images by valid user", (done) => {
    request(app)
      .get("/api/users/1/albums/images?offset=0&limit=fy")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          code: 400,
          msg: 'failure - "limit" must be a number',
          results: [],
        });
        done();
      });
  });
});

describe("Test validation get Albums and Images by valid user", () => {
  test("Should return bad Request with invalid sortByAlbumTitle - Albums and Images by valid user", (done) => {
    request(app)
      .get(
        "/api/users/1/albums/images?offset=0&limit=10&sortByAlbumTitle=fatih"
      )
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          code: 400,
          msg: 'failure - "sortByAlbumTitle" must be one of [ASC, DESC, asc, desc]',
          results: [],
        });
        done();
      });
  });
});

describe("Test validation get Albums and Images by valid user", () => {
  test("Should return 200 ordering with ASC- Albums and Images by valid user", (done) => {
    request(app)
      .get("/api/users/1/albums/images?offset=0&limit=10&sortByAlbumTitle=ASC")
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test validation get Albums and Images by valid user", () => {
  test("Should return 200 ordering with DESC- Albums and Images by valid user", (done) => {
    request(app)
      .get("/api/users/1/albums/images?offset=0&limit=10&sortByAlbumTitle=DESC")
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});


describe("Test get Albums and Images  by valid user Id ", () => {
  test("Should album images object check types", (done) => {
    request(app)
      .get("/api/users/1/albums/images")
      .expect(200)
      .then((response) => {
        expect(response.body.results).toEqual(
          expect.objectContaining([{
            id: expect.any(Number),
            title: expect.any(String),
            userId: expect.any(Number),
            images: expect.any(Array),
          }])
        );
        expect(response.body.results[0].images).toEqual(
          expect.objectContaining(
           [{
              id: expect.any(Number),
              title: expect.any(String),
              url: expect.any(String),
              albumId: expect.any(Number),
            }]
          )
        );
        done();
      });
  });
});

/**
 * Test related about routers
 */
describe("Test unknown path ", () => {
  test("Should return httpStatus 404", (done) => {
    request(app)
      .get("/fy")
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe("Test path exists ", () => {
  test("Should return httpStatus 200", (done) => {
    request(app)
      .get("/api/users/2")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
