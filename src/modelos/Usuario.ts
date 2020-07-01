import {Expose} from "class-transformer";
export class Usuario {
    @Expose() private nome: string
    @Expose() private email: string
    @Expose() private photo: string

    getNome() {
        return this.nome
    }

}