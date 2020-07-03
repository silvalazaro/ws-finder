import { Expose } from "class-transformer";
import { Modelo } from "./Modelo";
export class Usuario implements Modelo {
  _id: string;
  getId(): void {
    throw new Error("Method not implemented.");
  }
  setId(): void {
    throw new Error("Method not implemented.");
  }
  @Expose() private nome: string;
  @Expose() private email: string;
  @Expose() private photo: string;

  getNome() {
    return this.nome;
  }
}
