const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {
  describe("GET /", () => {
    it("should return status code 200 and have 'Welcome' in the body of the response", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome");
        done();
      });
    });
  });

  describe("GET /about", () => {
    it("should return status code 200 and have 'Nearest Food Pantry' in the middle of the response", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Nearest Food Pantry");
        done();
      });
    });
  });
});
