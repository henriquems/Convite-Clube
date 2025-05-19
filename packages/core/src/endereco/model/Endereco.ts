import { PeriodoInscricao } from "../../periodoInscricao"
import { Usuario } from "../../usuario"

export default interface Endereco {
    id?: number
    usuario: Usuario
    logradouro: string
    cidade: string
    estado: string
    cep: string
    bairro: string
    numero: string
    complemento?: string
}