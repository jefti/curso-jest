import prisma from "database";
import { UserInput } from "repository";

export async function registerUser(){
    const userData: UserInput = {
        email: "teste@teste.com.br",
        password: "teste"
      };
    
      await prisma.user.create({
        data: userData
      });
}
