const request = require("supertest");
const app = require("../src/index");

describe("Auth routes", () => {
  test("should register a new user", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ username: "testuser", password: "password" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("should log in an existing user", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username: "testuser", password: "password" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
