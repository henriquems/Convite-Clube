import Boleto from "../model/Boleto"

export default interface RepositorioBoleto {
    quantidadeBoletosDoPedido(idPedido: number): Promise<number>
    recuperarUltimoBoletoDoPedido(idPedido: number): Promise<Boleto | null>
    existeBoletoGeradoParaPedido(idPedido: number): Promise<boolean>
    recuperar(id: number): Promise<Boleto | null>
    salvar(boleto: Boleto): Promise<number>
    atualizar(boleto: Boleto): Promise<number>
}