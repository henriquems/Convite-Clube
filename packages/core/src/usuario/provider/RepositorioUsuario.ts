import Usuario from "../model/Usuario"

export default interface RepositorioUsuario {
    listar(page: string, tamanho: string): Promise<{ total: number, data: Usuario[] }>;
    recuperar(id: number): Promise<Usuario | null>
    recuperarUsuariosDoCurso(id: number): Promise<Usuario[]>
    salvar(usuario: Usuario): Promise<void>
    excluir(id: number): Promise<void>
    recuperarUsuarioPorEmail(email: string): Promise<Usuario>
    alterarSenha(novaSenha: String, idUsuario: number): Promise<string>
}