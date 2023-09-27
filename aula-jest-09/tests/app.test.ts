import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";
import { UserInput } from "repository";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const user: UserInput = {email:'teste@teste.com', password:'123456'};
    const result = await api.post("/users").send(user);
    expect(result.status).toEqual(201);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    const user: UserInput = {email:'teste@teste.com', password:'123456'};
    await api.post("/users").send(user);
    const result = await api.post("/users").send(user);
    expect(result.status).toEqual(409);
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const user: UserInput = {email:'teste@teste.com', password:'123456'};
    await api.post("/users").send(user);
    const result = await api.get("/users/1");
    expect(result.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      email: expect.any(String),
      password: expect.any(String)
    }));
  });

  it("should return 404 when can't find a user by id", async () => {
    const result = await api.get("/users/100");
    expect(result.status).toEqual(404);
  });

  it("should return all users", async () => {
    const user: UserInput = {email:'teste@teste.com', password:'123456'};
    await api.post("/users").send(user);
    const user2: UserInput = {email:'teste2@teste.com', password:'123456'};
    await api.post("/users").send(user2);
    const result = await api.get("/users");
    expect(result.body).toHaveLength(2);
  });

})