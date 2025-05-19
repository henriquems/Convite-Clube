import CasoDeUso from "../../shared/CasoDeUso";
import Pedido from "../model/Pedido";
import RepositorioPedido from "../provider/RepositorioPedido";

type Entrada = {
    id: number
}

export default class RecuperarPedido implements CasoDeUso<Entrada, Pedido> {
    constructor(private readonly repositorio: RepositorioPedido){}
    
    async executar(entrada: Entrada): Promise<Pedido> {
        const { id } = entrada
        if(!id) throw new Error('Período inscrição não encontrado!')
        return await this.repositorio.recuperar(id)
    }
}