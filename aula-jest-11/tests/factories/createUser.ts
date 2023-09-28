import { UserInput } from "repository";

export default function createUser(){
    const user: UserInput = {
        email: "teste@teste.com.br",
        password: "teste"
    };
    return user;
}


