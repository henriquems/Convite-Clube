import CasoDeUso from "../../shared/CasoDeUso";
import Pedido from "../model/Pedido";
import RepositorioPedido from "../provider/RepositorioPedido";
import { LimiteConvitesExcedido } from '../../errors/LimiteConvitesExcedido';

export default class CadastrarPedido implements CasoDeUso<Pedido, void> {
    constructor(private readonly repositorio: RepositorioPedido){}

    async executar(pedido: Pedido): Promise<void> {
        const quantidadeExistente = await this.repositorio.quantidadePorPeriodo(pedido.periodoInscricao.id);

        if (quantidadeExistente >= pedido.periodoInscricao.quantidadeConvite) {
            throw new LimiteConvitesExcedido();
        }

        await this.repositorio.salvar(pedido);
    }
}