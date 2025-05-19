import CasoDeUso from "../../shared/CasoDeUso"
import PeriodoInscricao from "../model/PeriodoInscricao"
import RepositorioPeriodoInscricao from "../provider/RepositorioPeriodoInscricao"

type Entrada = {
    id: number
}

export default class RecuperarPeriodoInscricao implements CasoDeUso<Entrada, PeriodoInscricao> {
    constructor(private readonly repositorio: RepositorioPeriodoInscricao){}
    
    async executar(entrada: Entrada): Promise<PeriodoInscricao> {
        const { id } = entrada
        if(!id) throw new Error('Período inscrição não encontrado!')
        return await this.repositorio.recuperar(id)
    }
}