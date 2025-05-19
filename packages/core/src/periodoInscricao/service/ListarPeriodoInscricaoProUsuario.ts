import CasoDeUso from "../../shared/CasoDeUso";
import { Usuario } from "../../usuario";
import PeriodoInscricao from "../model/PeriodoInscricao";
import RepositorioPeriodoInscricao from "../provider/RepositorioPeriodoInscricao";

type Entrada = {
    page: string
    pageSize: string
    usuario: Usuario
}

type ResultadoListagem = {
    total: number;
    data: PeriodoInscricao[];
};

export default class ListarPeriodoInscricaoProUsuario implements CasoDeUso<Entrada, ResultadoListagem> {
    constructor(private readonly repositorio: RepositorioPeriodoInscricao) {}

    async executar(entrada: Entrada): Promise<ResultadoListagem> {
        const {page, pageSize, usuario } = entrada;
        return this.repositorio.listarPeriodosProUsuario( page, pageSize, usuario);
    }
}