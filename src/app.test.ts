import app from "./app";
import request from "supertest";

describe("testing root route", () => {
  test("shold be returned with status 200", (done) => {
    request(app)
      .get("/users/all")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
