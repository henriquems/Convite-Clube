import CasoDeUso from "../../shared/CasoDeUso";
import RepositorioPeriodoInscricao from "../provider/RepositorioPeriodoInscricao";

type Entrada = {
    id: number
}

export default class ExcluirPeriodoInscricao implements CasoDeUso<Entrada, void> {
    constructor(private readonly repositorio: RepositorioPeriodoInscricao){}
    
    async executar(entrada: Entrada): Promise<void> {
        const { id } = entrada
        if(!id) throw new Error('Período Inscrição não encontrado!')
        await this.repositorio.excluir(id)
    }
}