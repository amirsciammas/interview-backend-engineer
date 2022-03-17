const request = require("supertest");
const app = require("./app");


describe("Test the unexpected path", () => {
  test("It should return 404", done => {
    request(app)
      .get("/unexpected")
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});