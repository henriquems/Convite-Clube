import { Usuario } from "../../usuario"

export default interface RepositorioAuth {
    logar(login: string): Promise<any>
}