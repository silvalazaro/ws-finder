import { Modelo } from "../modelos/Modelo";
import { Usuario } from "../modelos/Usuario";
import * as json from "class-transformer";

export interface InterfaceServico<T extends Modelo> {
  get(): T;

  add(arg: T);

  find(arg: Record<string, unknown>): Promise<T>;
}
export const ServicoFactory = {
  Usuario: (db): Servico<Usuario> => {
    return new Servico<Usuario>({
      tabela: "usuarios",
      db: db,
    });
  },
};

export class Servico<T extends Modelo> implements InterfaceServico<T> {
  private tabela: string;
  private db;

  constructor(config) {
    this.tabela = config.tabela;
    this.db = config.db;
  }

  get(): T {
    throw new Error("Method not implemented.");
  }
  add(arg: T): T {
    return arg;
  }

  async find(config: Record<string, unknown>): Promise<T> {
    const result = await this.db.collection("usuarios").find(config).toArray();
    if (result.length === 0) {
      throw new Error("Não encontrado.");
    }
    return result[0];
  }
}
