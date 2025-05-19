import CasoDeUso from "../../shared/CasoDeUso";
import Usuario from "../model/Usuario";
import RepositorioUsuario from "../provider/RepositorioUsuario";

type Entrada = {
    page: string
    pageSize: string
}

type ResultadoListagem = {
    total: number;
    data: Usuario[];
};

export default class ListarUsuario implements CasoDeUso<Entrada, ResultadoListagem> {
    constructor(private readonly repositorio: RepositorioUsuario) {}

    async executar(entrada: Entrada): Promise<ResultadoListagem> {
        const { page, pageSize } = entrada;
        return this.repositorio.listar(page, pageSize);
    }
}