import { Pedido } from "../../pedido"
import { StatusBoleto } from "./StatusBoleto"
import { StatusEnvio } from "./StatusEnvio"

export default interface Boleto {
    id?: number
    pedido: Pedido
    identificadorConvenio: string
    referenciaTransacao?: string
    valor: number
    quantidadePonto: string
    tipoPagamento: string
    cpfCnpj: string
    indicadorPessoa: string
    valorDesconto?: string
    dataLimiteDesconto?: string
    tipoDuplicata: string
    urlRetorno: string
    urlInforma?: string
    nome: string
    endereco: string
    cidade: string
    estado: string
    cep: string
    mensagem: string
    statusBoleto: StatusBoleto
    statusEnvio: StatusEnvio
    valorPagamento?: string
    tarifaBancaria?: string
    dataVencimento: Date
    dataPagamento?: Date
    dataBoleto: Date
}