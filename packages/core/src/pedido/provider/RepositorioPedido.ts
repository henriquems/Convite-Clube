import Pedido from "../model/Pedido"
import { FiltroRelatorioPedidoDto } from "../model/FiltroRelatorioPedido.dto";

export default interface RepositorioPedido {
    listar(page: string, tamanho: string, usuario?: { id: number, perfis: string[] }): Promise<{ total: number, data: Pedido[] }>;
    recuperar(id: number): Promise<Pedido | null>
    salvar(pedido: Pedido): Promise<void>
    excluir(id: number): Promise<void>
    quantidadePorPeriodo(periodoInscricaoId: number): Promise<number>
    gerarRelatorioPedidos(filtros: FiltroRelatorioPedidoDto): Promise<Buffer>
}