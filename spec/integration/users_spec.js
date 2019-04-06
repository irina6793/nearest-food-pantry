const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/user/";

describe("routes : user", () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  describe("GET /user/sign_up", () => {
    it("should render a view with a sign up form", done => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign Up");
        done();
      });
    });
  });

  describe("POST /user", () => {
    it("should create a new user with valid values and redirect", done => {
      const options = {
        url: base,
        form: {
          username: "irina",
          password: "techy",
          email: "irina67@yahoo.com",
          zipcode: "10046"
        }
      };
      request.post(options, (err, res, body) => {
        User.findOne({ where: { email: "irina67@yahoo.com" } })
          .then(user => {
            expect(user).not.toBeNull();
            expect(user.email).toBe("irina67@yahoo.com");
            expect(user.id).toBe(1);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
    it("should not create a new user with invalid attributes and redirect", done => {
      request.post(
        {
          url: base,
          form: {
            email: "no",
            password: "hello"
          }
        },
        (err, res, body) => {
          User.findOne({ where: { email: "no" } })
            .then(user => {
              expect(user).toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        }
      );
    });
  });

  describe("GET /user/sign_in", () => {
    it("should render a view with a sign in form", done => {
      request.get(`${base}sign_in`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign In");
        done();
      });
    });
  });

  describe("GET /user/:id", () => {
    beforeEach(done => {
      User.create({
        username: "Coder",
        email: "dasha@gmail.com",
        password: "tweet"
      }).then(user => {
        this.user = user;
        done();
      });
    });
  });
});
