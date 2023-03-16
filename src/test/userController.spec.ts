import request from "supertest";
import { app } from "../server";

describe("User controller", () => {
  it("should return user by ID", async () => {
    const res = await request(app).get("/users/1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it("should return 404 if user not found", async () => {
    const res = await request(app).get("/users/1000");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Invalid User id");
  });
});
