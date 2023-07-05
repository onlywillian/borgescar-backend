import app from "./app";
import request from "supertest";

describe("testing users routes", () => {
  test("shold be returned with status 200", async () => {
    const respose = await request(app).get("/users/all").expect(200);
  });

  test("should be passed name, email and password in params", async () => {
    const response = await request(app)
      .post("/users/new")
      .send({ name: "foo", email: "foo@gmail.com", password: "foo" });

    expect(response.body.email).not.toBeNull();
  });

  test("should return status code 400 when email params is missing", async () => {
    const response = await request(app).post("/users/new").expect(400);
  });
});
