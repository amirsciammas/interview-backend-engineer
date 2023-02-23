import request from "supertest";
import app from "../src/app";
import { Database } from "sqlite3";
import { open } from "sqlite";

describe("REST API", () => {
  let db: Database;

  beforeAll(async () => {
    // Open the SQLite database
    db = await open({
      filename: "./../database.sqli",
      driver: Database,
    });

  })

  afterAll(async () => {
    // Close the SQLite database
    await db.close();
  });

  describe("GET /users/:userId", () => {
    test("should return a user with the given ID", async () => {
      const response = await request(app).get("/users/1");
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe("Leanne Graham");
      expect(response.body.email).toBe("Sincere@april.biz");
    });

    test("should return a 404 status code if the user does not exist", async () => {
      const response = await request(app).get("/users/100000");
      expect(response.status).toBe(404);
    });
  });

