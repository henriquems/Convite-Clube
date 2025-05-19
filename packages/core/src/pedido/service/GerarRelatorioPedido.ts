import CasoDeUso from "../../shared/CasoDeUso";
import Pedido from "../model/Pedido";
import RepositorioPedido from "../provider/RepositorioPedido";
import { FiltroRelatorioPedidoDto } from "../model/FiltroRelatorioPedido.dto";

export default class GerarRelatorioPedido implements CasoDeUso<FiltroRelatorioPedidoDto, Buffer> {
    constructor(private readonly repositorio: RepositorioPedido) {}

    async executar(filtro: FiltroRelatorioPedidoDto): Promise<Buffer> {
        return this.repositorio.gerarRelatorioPedidos(filtro);
    }
}