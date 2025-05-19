import { PeriodoInscricao } from "../../periodoInscricao"
import { Usuario } from "../../usuario"
import { StatusPagamento } from "./StatusPagamento";

export default interface Pedido {
    id?: number
    usuario: Usuario
    periodoInscricao: PeriodoInscricao
    numero: string
    statusPagamento: StatusPagamento
    valorPedido: number
    valorPago?: number
    dataPagamento?: Date
    dataPedido: Date
}