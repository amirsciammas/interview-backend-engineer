import request from "supertest";
import app from "../src/index";
import { Database } from "sqlite3";
import { open } from "sqlite";

describe("REST API Test Case", () => {
  let db;

  beforeEach(async () => {
    // Open the SQLite database
    db = await open({
      filename: "database.db",
      driver: Database,
    });
  })

  afterAll(async () => {
    // Close the SQLite database
    await db.close()
  });

  describe("GET /users/:userId", () => {
    test("should return a userdetails with the given userID", async () => {
      const response = await request(app).get("/users/1");
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe("MS Dhoni");
      expect(response.body.email).toBe("msd@adi.biz");
    });

    test("should return a 400 status code if the user does not exist", async () => {
      const response = await request(app).get("/users/5");
      expect(response.status).toBe(400);
      expect(response.text).toEqual('User Id not Found');
    });
  });

  describe("GET /users/:userId/albums", () => {
    test("should return a user and album details with the given userID", async () => {
      const response = await request(app).get("/users/3/albums");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      expect(response.body[0].id).toBe(31);
      expect(response.body[0].userId).toBe(3);
      expect(response.body[0].title).toBe('Blank Space -Taylor Swift');
      expect(response.body[0].name).toBe('Rohit');
    });

    test("should return a 400 status code for the invalid input parameters", async () => {
      const response = await request(app).get("/users/76/albums");
      expect(response.status).toBe(400);
      expect(response.text).toEqual('Album details Not Found. Please check Input Parameters!');
    });
  });

  describe("GET /users/:userId/albums/images", () => {
    test("should return a user and album details with the given userID", async () => {
      const response = await request(app).get("/users/4/albums/images");
      console.log(response.body)
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].id).toBe(4001);
      expect(response.body[0].albumId).toBe(41);
      expect(response.body[0].title).toBe('Streets');
      expect(response.body[0].userId).toBe(4);
    });

    test("should return a 400 status code for the invalid input parameters", async () => {
      const response = await request(app).get("/users/76/albums/images");
      expect(response.status).toBe(400);
      expect(response.text).toEqual('Image details Not Found. Please check Input Parameters!');
    });
  });

})
