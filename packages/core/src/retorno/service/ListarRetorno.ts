import CasoDeUso from "../../shared/CasoDeUso";
import Retorno from "../model/Retorno";
import RepositorioRetorno from "../provider/RepositorioRetorno";

type Entrada = {
    page: string
    pageSize: string
}

type ResultadoListagem = {
    total: number;
    data: Retorno[];
};

export default class ListarRetorno implements CasoDeUso<Entrada, ResultadoListagem> {
    constructor(private readonly repositorio: RepositorioRetorno) {}

    async executar(entrada: Entrada): Promise<ResultadoListagem> {
        const { page, pageSize } = entrada;
        return this.repositorio.listar(page, pageSize);
    }
}