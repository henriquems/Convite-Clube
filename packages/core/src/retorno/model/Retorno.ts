import { Usuario } from "../../usuario"
import StatusRetorno from "./StatusRetorno"

export default interface Retorno {
    id?: number
    usuario: Usuario
    statusRetorno?: StatusRetorno
    linha: string
    tipoLinha?: string
    status?: string
    banco?: string
    agencia?: string
    conta?: string
    arquivo?: string
    dataProcessamento: Date
}