import { Curso } from "../../curso"
import { Endereco } from "../../endereco"
import { Pedido } from "../../pedido"
import { Perfil } from "../../perfil"
import { PeriodoLetivo } from "../../periodoLetivo"
import { StatusUsuario } from "./StatusUsuario"

export default interface Usuario {
    id?: number
    curso?: Curso
    periodoLetivo?: PeriodoLetivo
    nome: string
    email: string
    login: string 
    senha?: string
    cpf: string
    status: StatusUsuario
    perfis?: Partial<Perfil>[]
    enderecos?: Partial<Endereco>[]
    pedidos?: Partial<Pedido>[]
}