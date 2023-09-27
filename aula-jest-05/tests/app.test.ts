import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })
})

describe("/Fibonacci test", () => {
  it("should return 400 when ask /fibonacci?elements=0", async () => {
    const { status} = await api.get("/fibonacci?elements=0");
    expect(status).toBe(400);
  })

  it("should return a array containing 3 elements when ask /fibonacci?elements=3", async () => {
    const result =  await api.get("/fibonacci?elements=3");
    expect (result.body).toHaveLength(3);
  })
})