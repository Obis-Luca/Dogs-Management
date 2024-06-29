// Unit tests for all routes
const request = require("supertest");
const app = require("../server");
const data = require("../data");

describe("Post Endpoints", () => {
  it("should create a new post", async () => {
    const res = await request(app)
      .post("/api")
      .send({
        user: {
          Name: "name1",
          Age: "12",
          Salary: "233",
        },
      });
    expect(res.statusCode).toEqual(201);
  });

  it("should throw an invalid post body error", async () => {
    const res = await request(app)
      .post("/api")
      .send({
        user: { wrongFormat: "wrong1" },
      });
    expect(res.statusCode).toEqual(400);
  });

  it("should create a new user using the generateNewUser function", async () => {
    const res = await request(app).post("/api").send({
      user: data.generateNewUser(),
    });
    expect(res.statusCode).toEqual(201);
  });
});

describe("GET Endpoints", () => {
  it("should get all users", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(data.users);
  });

  it("should return server health status", async () => {
    const res = await request(app).get("/api/serverhealth");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("ok");
  });
});

describe("GET Endpoint", () => {
  it("should get a user by id", async () => {
    const userId = 1;
    const res = await request(app).get(`/api/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(userId);
  });

  it("should return 404 if user does not exist", async () => {
    const userId = 100;
    const res = await request(app).get(`/api/${userId}`);
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual("User not found");
  });
});

describe("DELETE Endpoint", () => {
  it("should delete a user by index", async () => {
    const userIdToDelete = "1";
    const res = await request(app).delete(`/delete/${userIdToDelete}`);

    expect(res.statusCode).toEqual(200);

    const deletedUser = data.users.find((user) => user.id === userIdToDelete);
    expect(deletedUser).toBeUndefined();
  });

  it("should return 404 if user does not exist", async () => {
    const userIdToDelete = 123456;
    const res = await request(app).delete(`/delete/${userIdToDelete}`);

    expect(res.statusCode).toEqual(404);

    expect(res.text).toEqual("User not found");
  });
});

describe("PUT Endpoint", () => {
  it("should update a user by id", async () => {
    const myId = "4";
    const newData = {
      id: parseInt(myId),
      Name: "UpdatedName",
      Age: 30,
      Salary: 5000,
    };

    const res = await request(app).put(`/api/${myId}`).send(newData);

    expect(res.statusCode).toEqual(200);
  });

  it("should return 404 if user does not exist", async () => {
    const userIdToUpdate = -1;
    const newData = {
      Name: "UpdatedName",
      Age: 30,
      Salary: 5000,
    };

    const res = await request(app)
      .put(`/api/${userIdToUpdate}`)
      .send({ newData });

    expect(res.statusCode).toEqual(404);
  });
});
