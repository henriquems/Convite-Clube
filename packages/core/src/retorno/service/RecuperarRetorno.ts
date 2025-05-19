import CasoDeUso from "../../shared/CasoDeUso"
import Retorno from "../model/Retorno"
import RepositorioRetorno from "../provider/RepositorioRetorno"

type Entrada = {
    id: number
}

export default class RecuperarRetorno implements CasoDeUso<Entrada, Retorno> {
    constructor(private readonly repositorio: RepositorioRetorno){}
    
    async executar(entrada: Entrada): Promise<Retorno> {
        const { id } = entrada
        if(!id) throw new Error('Retorno inscrição não encontrado!')
        return await this.repositorio.recuperar(id)
    }
}