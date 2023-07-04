import app from "./app";
import request from "supertest";

describe("testing users routes", () => {
  test("shold be returned with status 200", (done) => {
    request(app)
      .get("/users/all")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("should be passed name, email and password in params", async () => {
    const response = await request(app)
      .post("/users/new")
      .send({ name: "foo", email: "foo@gmail.com", password: "foo" });

    expect(response.body.email).not.toBeNull();
  });

  test("should return status code 400 when email params is missing", async () => {
    const response = await request(app)
      .post("/users/new")
      .expect("Content-Type", /json/)
      .expect(400)
      .send({ name: "foo" });
  });
});
