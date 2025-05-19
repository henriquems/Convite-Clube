import CasoDeUso from "../../shared/CasoDeUso";
import Boleto from "../model/Boleto";
import RepositorioBoleto from "../provider/RepositorioBoleto";

type Entrada = {
    idPedido: number
}

export default class RecuperarUltimoBoletoDoPedido implements CasoDeUso<Entrada, Boleto> {
    constructor(private readonly repositorio: RepositorioBoleto){}
    
    async executar(entrada: Entrada): Promise<Boleto> {
        const { idPedido } = entrada;
        if(!idPedido) throw new Error('Boleto não encontrado!');
        return await this.repositorio.recuperarUltimoBoletoDoPedido(idPedido);
    }
}