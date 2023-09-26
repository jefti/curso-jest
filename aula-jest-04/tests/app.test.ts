import app from "../src/index";
import supertest = require("supertest");

describe("Exercicio da aula 04",()=>{
    it("teste de health", async ()=>{
        const result = await supertest(app).get("/health");
        console.log(result);
        expect(result.status).toEqual(200);
    });
})