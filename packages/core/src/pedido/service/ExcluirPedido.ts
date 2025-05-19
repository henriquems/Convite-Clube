import CasoDeUso from "../../shared/CasoDeUso";
import RepositorioPedido from "../provider/RepositorioPedido";

type Entrada = {
    id: number
}

export default class ExcluirPedido implements CasoDeUso<Entrada, void> {
    constructor(private readonly repositorio: RepositorioPedido){}
    
    async executar(entrada: Entrada): Promise<void> {
        const { id } = entrada
        if(!id) throw new Error('Pedido não encontrado!')
        await this.repositorio.excluir(id)
    }
}