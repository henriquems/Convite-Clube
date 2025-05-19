import { Clube } from "../../clube"

export default interface PeriodoInscricao {
    id?: number
    clube: Clube
    descricao: string
    dataInicio: Date
    dataFim: Date
    quantidadeConvite: number
    valorConvite: number
    dataLimitePagamento: Date
    quantidadePedidos?: number
    quantidadeConvitesRestantes?: number
}