const request = require("supertest");
const app = require("../src/index");

describe("User routes", () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username: "testuser", password: "password" });
    token = response.body.token;
  });

  test("should get user information", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
  });
});
