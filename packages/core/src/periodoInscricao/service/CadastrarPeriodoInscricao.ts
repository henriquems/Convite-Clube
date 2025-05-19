import CasoDeUso from "../../shared/CasoDeUso";
import PeriodoInscricao from "../model/PeriodoInscricao";
import RepositorioPeriodoInscricao from "../provider/RepositorioPeriodoInscricao";

export default class CadastrarPeriodoInscricao implements CasoDeUso<PeriodoInscricao, void> {
    constructor(private readonly repositorio: RepositorioPeriodoInscricao){}

    async executar(periodoInscricao: PeriodoInscricao): Promise<void> {
        await this.repositorio.salvar(periodoInscricao)
    }
}