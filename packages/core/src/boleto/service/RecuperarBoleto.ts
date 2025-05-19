import CasoDeUso from "../../shared/CasoDeUso"
import Boleto from "../model/Boleto"
import RepositorioBoleto from "../provider/RepositorioBoleto"

type Entrada = {
    id: number
}

export default class RecuperarBoleto implements CasoDeUso<Entrada, Boleto> {
    constructor(private readonly repositorio: RepositorioBoleto){}
    
    async executar(entrada: Entrada): Promise<Boleto> {
        const { id } = entrada
        if(!id) throw new Error('Boleto não encontrado!')
        return await this.repositorio.recuperar(id)
    }
}