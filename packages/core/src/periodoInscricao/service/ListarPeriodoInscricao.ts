import CasoDeUso from "../../shared/CasoDeUso";
import PeriodoInscricao from "../model/PeriodoInscricao";
import RepositorioPeriodoInscricao from "../provider/RepositorioPeriodoInscricao";

type Entrada = {
    page: string
    pageSize: string
}

type ResultadoListagem = {
    total: number;
    data: PeriodoInscricao[];
};

export default class ListarPeriodoInscricao implements CasoDeUso<Entrada, ResultadoListagem> {
    constructor(private readonly repositorio: RepositorioPeriodoInscricao) {}

    async executar(entrada: Entrada): Promise<ResultadoListagem> {
        const { page, pageSize } = entrada;
        return this.repositorio.listar(page, pageSize);
    }
}