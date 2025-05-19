import Perfil from "../model/Perfil"

export default interface RepositorioPerfil {
    listar(): Promise<Perfil[] | null>
    salvar(perfil: Perfil): Promise<void>
    buscarPorNome(nome: string): Promise<any>
}